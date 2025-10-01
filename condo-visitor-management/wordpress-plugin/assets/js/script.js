jQuery(document).ready(function($) {
    // Alternar formulario de tipo de visita
    $('.condo-visitor-toggle').on('click', function() {
        const type = $(this).data('type');
        
        // Actualizar botón activo
        $('.condo-visitor-toggle').removeClass('active');
        $(this).addClass('active');
        
        // Mostrar/ocultar formularios
        if (type === 'unique') {
            $('#unique-visit-form').show();
            $('#frequent-visit-form').hide();
        } else {
            $('#unique-visit-form').hide();
            $('#frequent-visit-form').show();
        }
    });
    
    // Alternar campo de descripción "otros"
    $('select[name="frequent_visit_description"]').on('change', function() {
        if ($(this).val() === 'Otros') {
            $('#other-description-field').show();
        } else {
            $('#other-description-field').hide();
        }
    });
    
    // Manejar envío de formulario de visitante único
    $('#unique-visit-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        
        // Deshabilitar botón de envío y mostrar carga
        submitBtn.prop('disabled', true).text('Registrando...');
        
        // Obtener datos del formulario
        const formData = {
            wp_user_id: $('#current-wp-user-id').val(),
            first_name: form.find('input[name="first_name"]').val(),
            last_name: form.find('input[name="last_name"]').val(),
            id_card: form.find('input[name="id_card"]').val(),
            visit_date: form.find('input[name="visit_date"]').val(),
            visit_type: 'unique'
        };
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit/new',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                showMessage('Visitante registrado exitosamente', 'success');
                if (form.length > 0 && form[0]) {
                    form[0].reset();
                }
                // Establecer fecha por defecto a hoy después del reset
                const dateField = document.getElementById('unique_visit_date');
                if (dateField) {
                    dateField.valueAsDate = new Date();
                }
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar el visitante';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de envío - usar setTimeout para asegurar que se ejecute
                setTimeout(function() {
                    submitBtn.prop('disabled', false).text(originalBtnText);
                }, 100);
            }
        });
    });
    
    // Manejar envío de formulario de visitante frecuente
    $('#frequent-visit-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        
        // Deshabilitar botón de envío y mostrar carga
        submitBtn.prop('disabled', true).text('Registrando...');
        
        // Obtener datos del formulario
        const formData = {
            wp_user_id: $('#current-wp-user-id').val(),
            first_name: form.find('input[name="first_name"]').val(),
            last_name: form.find('input[name="last_name"]').val(),
            id_card: form.find('input[name="id_card"]').val(),
            frequent_visit_description: form.find('select[name="frequent_visit_description"]').val(),
            visit_type: 'frequent'
        };
        
        // Agregar descripción adicional si es necesario
        if (formData.frequent_visit_description === 'Otros') {
            formData.frequent_visit_other_description = form.find('input[name="frequent_visit_other_description"]').val();
        }
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit/new/frequent',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                showMessage('Visitante frecuente registrado exitosamente', 'success');
                if (form.length > 0 && form[0]) {
                    form[0].reset();
                }
                $('#other-description-field').hide();
                // Disparar evento para recargar la lista de visitantes frecuentes
                $(document).trigger('visitor-registered');
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar el visitante frecuente';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de envío - usar setTimeout para asegurar que se ejecute
                setTimeout(function() {
                    submitBtn.prop('disabled', false).text(originalBtnText);
                }, 100);
            }
        });
    });
    
    // Manejar búsqueda de validación de visitante
    $('#visitor-validation-form').on('submit', function(e) {
        e.preventDefault();
        
        const idCard = $('#id_card_search').val().trim();
        if (!idCard) {
            showMessage('Por favor ingrese un número de cédula', 'error');
            return;
        }
        
        const searchBtn = $(this).find('button[type="submit"]');
        const originalBtnText = searchBtn.text();
        
        // Deshabilitar botón de búsqueda y mostrar carga
        searchBtn.prop('disabled', true).text('Buscando...');
        
        // Limpiar resultados anteriores
        $('#validation-result').empty();
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit/validate/' + encodeURIComponent(idCard),
            method: 'GET',
            success: function(response) {
                if (response.valid && response.visitor) {
                    displayVisitorInfo(response.visitor);
                } else {
                    showMessage('Visitante no encontrado o no válido para hoy', 'error');
                }
            },
            error: function(xhr) {
                let errorMessage = 'Error al validar el visitante';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de búsqueda
                searchBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
    
    // Manejar cambio de tipo de visita (peatonal/vehículo) - inicializar al cargar
    $(document).on('change', 'input[name^="visit_type_"]', function() {
        const visitorId = $(this).attr('name').split('_')[2];
        const submitBtn = $(`.register-arrival-btn[data-visitor-id="${visitorId}"]`);
        
        if ($(this).val() === 'vehicle') {
            $(`.vehicle-plate-field-${visitorId}`).show();
            $(`#vehicle_plate_${visitorId}`).prop('required', true);
            submitBtn.prop('disabled', true); // Deshabilitar hasta que se ingrese placa
        } else {
            $(`.vehicle-plate-field-${visitorId}`).hide();
            $(`#vehicle_plate_${visitorId}`).prop('required', false).val('');
            submitBtn.prop('disabled', false); // Habilitar para peatonal
        }
    });
    
    // Manejar cambio en campo de placa para habilitar/deshabilitar botón
    $(document).on('input', 'input[id^="vehicle_plate_"]', function() {
        const visitorId = $(this).attr('id').split('_')[2];
        const submitBtn = $(`.register-arrival-btn[data-visitor-id="${visitorId}"]`);
        const plateValue = $(this).val().trim();
        
        // Habilitar botón solo si hay placa válida
        if (plateValue.length > 0) {
            submitBtn.prop('disabled', false);
        } else {
            submitBtn.prop('disabled', true);
        }
    });
    
    // Inicializar formularios cuando se cargan
    $(document).on('DOMNodeInserted', function() {
        // Habilitar botones para peatonal por defecto
        $('input[name^="visit_type_"][value="pedestrian"]:checked').each(function() {
            const visitorId = $(this).attr('name').split('_')[2];
            $(`.register-arrival-btn[data-visitor-id="${visitorId}"]`).prop('disabled', false);
        });
    });
    
    // Manejar envío del formulario de registro de llegada
    $(document).on('submit', '.arrival-form', function(e) {
        e.preventDefault();
        
        const visitorId = $(this).data('visitor-id');
        const visitType = $(`input[name="visit_type_${visitorId}"]:checked`).val();
        const vehiclePlate = $(`#vehicle_plate_${visitorId}`).val().trim();
        const submitBtn = $(`.register-arrival-btn[data-visitor-id="${visitorId}"]`);
        const originalBtnText = submitBtn.text();
        
        // Validar placa si es vehículo
        if (visitType === 'vehicle' && !vehiclePlate) {
            alert('Por favor ingrese la placa del vehículo');
            return;
        }
        
        // Deshabilitar botón y mostrar carga
        submitBtn.prop('disabled', true).text('Registrando...');
        
        // Preparar datos
        const requestData = {
            visit_type: visitType
        };
        
        if (visitType === 'vehicle') {
            requestData.vehicle_plate = vehiclePlate;
        }
        
        // Enviar solicitud AJAX
        $.ajax({
            url: condo_visitor_ajax.api_url + '/log/' + visitorId,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                showMessage('Llegada registrada exitosamente', 'success');
                
                // Ocultar formulario y limpiar
                $(`#arrival-registration-form-${visitorId}`).hide();
                $('#validation-result').empty();
                $('#id_card_search').val('');
                
                // Recargar las tablas si existen
                if (typeof loadTodaysVisitors === 'function') {
                    loadTodaysVisitors();
                }
                if (typeof loadVisitHistory === 'function') {
                    var selectedDate = $('#history-date-filter').val();
                    loadVisitHistory(selectedDate);
                }
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar la llegada';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón
                submitBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
    
    // Manejar registro de llegada de visitante
    $(document).on('click', '.log-arrival-btn', function() {
        const visitorId = $(this).data('visitor-id');
        const btn = $(this);
        const originalBtnText = btn.text();
        
        // Deshabilitar botón y mostrar carga
        btn.prop('disabled', true).text('Registrando...');
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit/log/' + visitorId,
            method: 'POST',
            success: function(response) {
                showMessage('Llegada registrada exitosamente', 'success');
                // Actualizar botón para mostrar que fue registrado
                btn.html('<span style="color: green;">✓ Llegada registrada</span>').removeClass('log-arrival-btn').addClass('arrival-logged');
                
                // Recargar las tablas para mostrar la actualización
                if (typeof loadTodaysVisitors === 'function') {
                    loadTodaysVisitors();
                }
                if (typeof loadVisitHistory === 'function') {
                    var selectedDate = $('#history-date-filter').val();
                    loadVisitHistory(selectedDate);
                }
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar la llegada';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
                // Rehabilitar botón
                btn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
    
    // Manejar activación/desactivación de visitante frecuente
    $(document).on('click', '.toggle-visitor-status', function() {
        const visitorId = $(this).data('visitor-id');
        const action = $(this).data('action');
        const btn = $(this);
        const originalBtnText = btn.text();
        
        // Deshabilitar botón y mostrar carga
        btn.prop('disabled', true).text('Procesando...');
        
        // Determinar endpoint
        const endpoint = action === 'activate' 
            ? '/frequent/' + visitorId + '/activate' 
            : '/frequent/' + visitorId + '/deactivate';
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit' + endpoint,
            method: 'PUT',
            success: function(response) {
                showMessage('Estado actualizado exitosamente', 'success');
                // Recargar la lista de visitantes
                location.reload();
            },
            error: function(xhr) {
                let errorMessage = 'Error al actualizar el estado';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
                // Rehabilitar botón
                btn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
    
    // Función para mostrar información del visitante
    function displayVisitorInfo(visitor) {
        const resultContainer = $('#validation-result');
        
        let statusClass = 'condo-visitor-alert-success';
        let statusText = 'Autorizado';
        
        if (visitor.visit_type === 'frequent' && !visitor.active) {
            statusClass = 'condo-visitor-alert-error';
            statusText = 'No autorizado (visitante inactivo)';
        }
        
        const visitDescription = visitor.frequent_visit_description === 'Otros' 
            ? visitor.frequent_visit_other_description 
            : visitor.frequent_visit_description;
        
        const html = `
            <div class="condo-visitor-validation-result">
                <div class="condo-visitor-validation-header">
                    <h3 class="condo-visitor-validation-title">Información del Visitante</h3>
                    <div class="${statusClass}">${statusText}</div>
                </div>
                <div class="condo-visitor-validation-info">
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Nombre:</div>
                        <div class="condo-visitor-info-value">${visitor.first_name} ${visitor.last_name}</div>
                    </div>
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Cédula:</div>
                        <div class="condo-visitor-info-value">${visitor.id_card}</div>
                    </div>
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Tipo de visita:</div>
                        <div class="condo-visitor-info-value">${visitor.visit_type === 'unique' ? 'Única' : 'Frecuente'}</div>
                    </div>
                    ${visitor.visit_type === 'frequent' ? `
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Descripción:</div>
                        <div class="condo-visitor-info-value">${visitDescription || 'N/A'}</div>
                    </div>
                    ` : ''}
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Propietario:</div>
                        <div class="condo-visitor-info-value">${visitor.owner_name}</div>
                    </div>
                    ${visitor.visit_type === 'unique' ? `
                    <div class="condo-visitor-info-item">
                        <div class="condo-visitor-info-label">Fecha de visita:</div>
                        <div class="condo-visitor-info-value">${visitor.visit_date}</div>
                    </div>
                    ` : ''}
                </div>
                ${visitor.visit_type === 'unique' || visitor.active ? `
                <!-- Formulario de registro de llegada integrado -->
                <div class="arrival-form-container" style="margin-top: 15px;">
                    <h4>Registrar Llegada</h4>
                    <form class="arrival-form" data-visitor-id="${visitor.id}">
                        <div class="condo-visitor-form-group">
                            <label>
                                <input type="radio" name="visit_type_${visitor.id}" value="pedestrian" checked>
                                Peatonal
                            </label>
                            <label>
                                <input type="radio" name="visit_type_${visitor.id}" value="vehicle">
                                Con Vehículo
                            </label>
                        </div>
                        
                        <div class="vehicle-plate-field-${visitor.id}" style="display: none;">
                            <div class="condo-visitor-form-group">
                                <label for="vehicle_plate_${visitor.id}">Placa del Vehículo</label>
                                <input type="text" id="vehicle_plate_${visitor.id}" name="vehicle_plate_${visitor.id}" placeholder="Ej: ABC-123" maxlength="20">
                            </div>
                        </div>
                        
                        <button type="submit" class="condo-visitor-btn register-arrival-btn" data-visitor-id="${visitor.id}" disabled>
                            Registrar Llegada
                        </button>
                    </form>
                </div>
                ` : ''}
            </div>
        `;
        
        resultContainer.html(html);
        
        // Inicializar el formulario después de insertarlo
        setTimeout(function() {
            const visitorId = visitor.id;
            $(`input[name="visit_type_${visitorId}"][value="pedestrian"]`).prop('checked', true);
            $(`.vehicle-plate-field-${visitorId}`).hide();
            $(`#vehicle_plate_${visitorId}`).prop('required', false);
            $(`.register-arrival-btn[data-visitor-id="${visitorId}"]`).prop('disabled', false);
        }, 100);
    }
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
        const alertClass = type === 'success' 
            ? 'condo-visitor-alert-success' 
            : 'condo-visitor-alert-error';
        
        const html = `
            <div class="condo-visitor-alert ${alertClass}">
                ${message}
            </div>
        `;
        
        // Insertar mensaje al principio del contenedor
        $('.condo-visitor-container').prepend(html);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(function() {
            $('.condo-visitor-alert').first().fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }
});