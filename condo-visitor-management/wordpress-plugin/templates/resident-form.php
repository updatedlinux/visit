<div class="condo-visitor-container">
    <input type="hidden" id="current-wp-user-id" value="<?php echo get_current_user_id(); ?>">
    
    <div class="condo-visitor-section">
        <h2>Registro de Visitantes</h2>
        
        <div class="condo-visitor-form-group">
            <button class="condo-visitor-toggle active" data-type="unique">Visita Única</button>
            <button class="condo-visitor-toggle" data-type="frequent">Visita Frecuente</button>
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
                            <input type="text" id="unique_id_card" name="id_card" required>
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
                            <input type="text" id="frequent_id_card" name="id_card" required>
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
});
</script>