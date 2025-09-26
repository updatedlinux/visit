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
                form[0].reset();
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar el visitante';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de envío
                submitBtn.prop('disabled', false).text(originalBtnText);
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
                form[0].reset();
                $('#other-description-field').hide();
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar el visitante frecuente';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de envío
                submitBtn.prop('disabled', false).text(originalBtnText);
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
                btn.text('Llegada registrada').removeClass('log-arrival-btn').addClass('arrival-logged');
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
                <button class="condo-visitor-btn log-arrival-btn" data-visitor-id="${visitor.id}">
                    Registrar llegada
                </button>
                ` : ''}
            </div>
        `;
        
        resultContainer.html(html);
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