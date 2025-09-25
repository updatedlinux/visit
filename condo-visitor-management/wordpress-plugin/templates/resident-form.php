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
            <!-- Esto se llenaría mediante AJAX en una implementación real -->
            <p>Los visitantes frecuentes registrados aparecerán aquí.</p>
        </div>
    </div>
</div>

<script>
// Establecer fecha por defecto a hoy
document.getElementById('unique_visit_date').valueAsDate = new Date();
</script>