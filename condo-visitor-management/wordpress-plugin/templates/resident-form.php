<div class="condo-visitor-container">
    <input type="hidden" id="current-wp-user-id" value="<?php echo get_current_user_id(); ?>">
    <input type="hidden" id="current-wp-user-name" value="<?php 
        $current_user = wp_get_current_user();
        echo esc_attr($current_user->display_name ? $current_user->display_name : $current_user->user_nicename);
    ?>">
    
    <div class="condo-visitor-section">
        <h2>Registro de Visitantes</h2>
        
        <div class="condo-visitor-form-group">
            <button class="condo-visitor-toggle active" data-type="unique">Visita Única</button>
            <button class="condo-visitor-toggle" data-type="frequent">Visita Frecuente</button>
            <button class="condo-visitor-toggle" data-type="delivery">Deliverys</button>
        </div>
        
        <!-- Formulario de Visita Única -->
        <div id="unique-visit-form" class="condo-visitor-form">
            <h3>Registrar Visita Única</h3>
            
            <form>
                <div class="condo-visitor-form-row">
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="unique_first_name">Nombre</label>
                            <input type="text" id="unique_first_name" name="first_name" required>
                        </div>
                    </div>
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="unique_last_name">Apellido</label>
                            <input type="text" id="unique_last_name" name="last_name" required>
                        </div>
                    </div>
                </div>
                
                <div class="condo-visitor-form-row">
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="unique_id_card">Cédula de Identidad</label>
                            <input type="text" id="unique_id_card" name="id_card" pattern="[0-9]+" title="Solo se permiten números" required>
                        </div>
                    </div>
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="unique_visit_date">Fecha de Visita</label>
                            <input type="date" id="unique_visit_date" name="visit_date" required>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="condo-visitor-btn">Registrar Visita</button>
            </form>
        </div>
        
        <!-- Formulario de Visita Frecuente -->
        <div id="frequent-visit-form" class="condo-visitor-form" style="display: none;">
            <h3>Registrar Visita Frecuente</h3>
            
            <form>
                <div class="condo-visitor-form-row">
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="frequent_first_name">Nombre</label>
                            <input type="text" id="frequent_first_name" name="first_name" required>
                        </div>
                    </div>
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="frequent_last_name">Apellido</label>
                            <input type="text" id="frequent_last_name" name="last_name" required>
                        </div>
                    </div>
                </div>
                
                <div class="condo-visitor-form-row">
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="frequent_id_card">Cédula de Identidad</label>
                            <input type="text" id="frequent_id_card" name="id_card" pattern="[0-9]+" title="Solo se permiten números" required>
                        </div>
                    </div>
                    <div class="condo-visitor-form-col">
                        <div class="condo-visitor-form-group">
                            <label for="frequent_visit_description">Relación</label>
                            <select id="frequent_visit_description" name="frequent_visit_description" required>
                                <option value="">Seleccione una opción</option>
                                <option value="Familia">Familia</option>
                                <option value="Transporte Escolar">Transporte Escolar</option>
                                <option value="Proveedores">Proveedores</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="condo-visitor-form-group" id="other-description-field" style="display: none;">
                    <label for="frequent_visit_other_description">Especifique la relación</label>
                    <input type="text" id="frequent_visit_other_description" name="frequent_visit_other_description">
                </div>
                
                <button type="submit" class="condo-visitor-btn">Registrar Visitante Frecuente</button>
            </form>
        </div>
        
        <!-- Formulario de Delivery -->
        <div id="delivery-form" class="condo-visitor-form" style="display: none;">
            <h3>Registrar Delivery</h3>
            
            <form id="delivery-registration-form">
                <div class="condo-visitor-form-group">
                    <label for="delivery_name">Nombre y/o Apellido</label>
                    <input type="text" id="delivery_name" name="name" placeholder="Ej: Juan Pérez o Delivery Express" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="delivery_date_display">Fecha de Llegada del Delivery</label>
                    <input type="text" id="delivery_date_display" readonly style="background-color: #f5f5f5; cursor: not-allowed;">
                    <input type="hidden" id="delivery_date" name="delivery_date">
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="delivery_company">Empresa</label>
                    <input type="text" id="delivery_company" name="company" placeholder="Ej: PedidosYa, Rappi, Delivery Express" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="delivery_owner">Propietario Solicitante</label>
                    <input type="text" id="delivery_owner" readonly style="background-color: #f5f5f5; cursor: not-allowed;">
                </div>
                
                <button type="submit" class="condo-visitor-btn">Registrar Delivery</button>
            </form>
        </div>
    </div>
    
    <!-- Lista de Visitantes Frecuentes -->
    <div class="condo-visitor-section">
        <h3>Mis Visitantes Frecuentes</h3>
        
        <div id="frequent-visitors-list">
            <div class="condo-visitor-loading">
                <p>Cargando visitantes frecuentes...</p>
            </div>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    // Establecer fecha por defecto a hoy
    document.getElementById('unique_visit_date').valueAsDate = new Date();
    
    // Alternar formulario de tipo de visita (manejo local para asegurar que funcione)
    $('.condo-visitor-toggle').on('click', function() {
        const type = $(this).data('type');
        
        // Actualizar botón activo
        $('.condo-visitor-toggle').removeClass('active');
        $(this).addClass('active');
        
        // Mostrar/ocultar formularios
        if (type === 'unique') {
            $('#unique-visit-form').show();
            $('#frequent-visit-form').hide();
            $('#delivery-form').hide();
        } else if (type === 'frequent') {
            $('#unique-visit-form').hide();
            $('#frequent-visit-form').show();
            $('#delivery-form').hide();
        } else if (type === 'delivery') {
            $('#unique-visit-form').hide();
            $('#frequent-visit-form').hide();
            $('#delivery-form').show();
            
            // Establecer fecha actual y nombre del propietario cuando se muestra el formulario
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const formattedDateDisplay = today.toLocaleDateString('es-VE', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            });
            
            $('#delivery_date').val(formattedDate);
            $('#delivery_date_display').val(formattedDateDisplay);
            $('#delivery_owner').val($('#current-wp-user-name').val());
        }
    });
    
    // Función para cargar visitantes frecuentes del usuario
    function loadFrequentVisitors() {
        const wpUserId = $('#current-wp-user-id').val();
        
        $.ajax({
            url: condo_visitor_ajax.api_url + '/frequent/user/' + wpUserId,
            method: 'GET',
            success: function(response) {
                const container = $('#frequent-visitors-list');
                container.empty();
                
                if (response.visitors && response.visitors.length > 0) {
                    let html = '<div class="condo-visitor-table-container">';
                    html += '<table class="condo-visitor-table">';
                    html += '<thead><tr>';
                    html += '<th>Nombre</th>';
                    html += '<th>Cédula</th>';
                    html += '<th>Relación</th>';
                    html += '<th>Estado</th>';
                    html += '<th>Fecha Registro</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    response.visitors.forEach(function(visitor) {
                        const description = visitor.frequent_visit_description === 'Otros' 
                            ? visitor.frequent_visit_other_description 
                            : visitor.frequent_visit_description;
                        
                        const statusText = visitor.active ? 'Activo' : 'Inactivo';
                        const statusClass = visitor.active ? 'condo-visitor-status-active' : 'condo-visitor-status-inactive';
                        const createdDate = visitor.created_at || 'N/A';
                        
                        html += '<tr>';
                        html += '<td>' + visitor.first_name + ' ' + visitor.last_name + '</td>';
                        html += '<td>' + visitor.id_card + '</td>';
                        html += '<td>' + (description || 'N/A') + '</td>';
                        html += '<td><span class="' + statusClass + '">' + statusText + '</span></td>';
                        html += '<td>' + createdDate + '</td>';
                        html += '<td>';
                        if (visitor.active) {
                            html += '<button class="condo-visitor-btn condo-visitor-btn-small toggle-visitor-status" data-visitor-id="' + visitor.id + '" data-action="deactivate">Desactivar</button>';
                        } else {
                            html += '<button class="condo-visitor-btn condo-visitor-btn-small toggle-visitor-status" data-visitor-id="' + visitor.id + '" data-action="activate">Activar</button>';
                        }
                        html += '</td>';
                        html += '</tr>';
                    });
                    
                    html += '</tbody></table></div>';
                    container.html(html);
                } else {
                    container.html('<p class="condo-visitor-no-data">No tienes visitantes frecuentes registrados.</p>');
                }
            },
            error: function() {
                const container = $('#frequent-visitors-list');
                container.empty();
                container.html('<p class="condo-visitor-error">Error al cargar visitantes frecuentes.</p>');
            }
        });
    }
    
    // Cargar visitantes frecuentes al cargar la página
    loadFrequentVisitors();
    
    // Recargar visitantes frecuentes después de registrar uno nuevo
    $(document).on('visitor-registered', function() {
        loadFrequentVisitors();
    });
    
    // Manejar envío de formulario de delivery (manejo local)
    $('#delivery-registration-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        
        // Deshabilitar botón de envío y mostrar carga
        submitBtn.prop('disabled', true).text('Registrando...');
        
        // Obtener datos del formulario
        const formData = {
            wp_user_id: $('#current-wp-user-id').val(),
            name: form.find('input[name="name"]').val(),
            company: form.find('input[name="company"]').val(),
            delivery_date: form.find('input[name="delivery_date"]').val()
        };
        
        // Enviar solicitud AJAX
        $.ajax({
            url: 'https://api.bonaventurecclub.com/visit/delivery/new',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                showMessage('Delivery registrado exitosamente', 'success');
                // Limpiar campos manualmente
                form.find('input[type="text"]').not('#delivery_date_display').not('#delivery_owner').val('');
                // Restablecer fecha actual
                const today = new Date();
                const formattedDate = today.toISOString().split('T')[0];
                const formattedDateDisplay = today.toLocaleDateString('es-VE', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                });
                $('#delivery_date').val(formattedDate);
                $('#delivery_date_display').val(formattedDateDisplay);
            },
            error: function(xhr) {
                let errorMessage = 'Error al registrar el delivery';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage(errorMessage, 'error');
            },
            complete: function() {
                // Rehabilitar botón de envío
                setTimeout(function() {
                    submitBtn.prop('disabled', false).text(originalBtnText);
                }, 100);
            }
        });
    });
});
</script>