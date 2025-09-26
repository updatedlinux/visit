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
jQuery(document).ready(function($) {
  // Función para cargar visitantes de hoy
  function loadTodaysVisitors() {
    $.ajax({
      url: condo_visitor_ajax.api_url + '/today',
      method: 'GET',
      success: function(response) {
        var tbody = $('#todays-visitors tbody');
        tbody.empty();
        if (response.visitors && response.visitors.length > 0) {
          response.visitors.forEach(function(visitor) {
            var row = '<tr>' +
              '<td>' + visitor.first_name + ' ' + visitor.last_name + '</td>' +
              '<td>' + visitor.id_card + '</td>' +
              '<td>' + visitor.owner_name + '</td>' +
              '<td>' + visitor.visit_type + '</td>' +
              '<td><button class="condo-visitor-btn">Acción</button></td>' +
              '</tr>';
            tbody.append(row);
          });
        } else {
          tbody.append('<tr><td colspan="5" style="text-align:center;">No hay visitantes de hoy.</td></tr>');
        }
      },
      error: function() {
        console.error('Error al obtener visitantes de hoy');
      }
    });
  }

  // Función para cargar historial de visitas
  function loadVisitHistory(date) {
    $.ajax({
      url: condo_visitor_ajax.api_url + '/history?date=' + encodeURIComponent(date),
      method: 'GET',
      success: function(response) {
        var tbody = $('#visit-history tbody');
        tbody.empty();
        if (response.history && response.history.length > 0) {
          response.history.forEach(function(visit) {
            var row = '<tr>' +
              '<td>' + visit.first_name + ' ' + visit.last_name + '</td>' +
              '<td>' + visit.id_card + '</td>' +
              '<td>' + visit.owner_name + '</td>' +
              '<td>' + visit.visit_type + '</td>' +
              '<td>' + visit.visit_date + '</td>' +
              '<td>' + visit.arrival_datetime + '</td>' +
              '</tr>';
            tbody.append(row);
          });
        } else {
          tbody.append('<tr><td colspan="6" style="text-align:center;">No hay historial de visitas para esta fecha.</td></tr>');
        }
      },
      error: function() {
        console.error('Error al obtener historial de visitas');
      }
    });
  }

  // Establecer fecha por defecto a hoy
  $('#history-date-filter').val(new Date().toISOString().split('T')[0]);

  // Cargar visitantes de hoy al cargar la página
  loadTodaysVisitors();

  // Cargar historial de visitas al cargar la página
  loadVisitHistory($('#history-date-filter').val());

  // Refrescar visitantes de hoy cada 5 segundos
  var todaysInterval = setInterval(loadTodaysVisitors, 5000);

  // Filtrar historial de visitas por fecha
  $('#filter-history-btn').click(function(e) {
    e.preventDefault();
    var selectedDate = $('#history-date-filter').val();
    loadVisitHistory(selectedDate);
  });

  // Limpiar el interval cuando la página se descarga
  $(window).on('unload', function() {
    clearInterval(todaysInterval);
  });
});
</script>