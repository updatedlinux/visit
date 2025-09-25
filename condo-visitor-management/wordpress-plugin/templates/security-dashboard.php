<div class="condo-visitor-container">
    <div class="condo-visitor-section">
        <h2>Panel de Seguridad - Validación de Visitantes</h2>
        
        <!-- Validación de Visitante -->
        <div class="condo-visitor-form">
            <h3>Validar Visitante</h3>
            
            <form id="visitor-validation-form">
                <div class="condo-visitor-search-container">
                    <input type="text" id="id_card_search" placeholder="Ingrese número de cédula" required>
                    <button type="submit" class="condo-visitor-btn">Buscar</button>
                </div>
            </form>
            
            <div id="validation-result">
                <!-- Los resultados de validación se mostrarán aquí -->
            </div>
        </div>
    </div>
    
    <!-- Visitantes de Hoy -->
    <div class="condo-visitor-section">
        <h3>Visitantes de Hoy</h3>
        
        <div class="condo-visitor-form">
            <table class="condo-visitor-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Propietario</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" style="text-align: center;">Cargando visitantes de hoy...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Historial de Visitas -->
    <div class="condo-visitor-section">
        <h3>Historial de Visitas</h3>
        
        <div class="condo-visitor-form">
            <div class="condo-visitor-search-container">
                <input type="date" id="history-date-filter">
                <button class="condo-visitor-btn" id="filter-history-btn">Filtrar</button>
            </div>
            
            <table class="condo-visitor-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Propietario</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Última Llegada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" style="text-align: center;">Cargando historial de visitas...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
// En una implementación real, obtendrías datos de la API
// Esto es solo un marcador de posición para mostrar la estructura

// Establecer fecha por defecto a hoy
document.getElementById('history-date-filter').valueAsDate = new Date();

// Ejemplo de cómo podrías obtener visitantes de hoy
/*
jQuery(document).ready(function($) {
    $.ajax({
        url: condo_visitor_ajax.api_url + '/today',
        method: 'GET',
        success: function(response) {
            // Llenar tabla de visitantes de hoy
            console.log(response);
        },
        error: function(xhr) {
            console.error('Error al obtener visitantes de hoy');
        }
    });
});
*/
</script>