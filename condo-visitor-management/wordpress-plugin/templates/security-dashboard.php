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
            
            <!-- Formulario de registro de llegada (oculto inicialmente) -->
            <div id="arrival-registration-form" style="display: none;">
                <h4>Registrar Llegada</h4>
                <form id="arrival-form">
                    <div class="condo-visitor-form-group">
                        <label>
                            <input type="radio" name="visit_type" value="pedestrian" checked>
                            Peatonal
                        </label>
                        <label>
                            <input type="radio" name="visit_type" value="vehicle">
                            Con Vehículo
                        </label>
                    </div>
                    
                    <div id="vehicle-plate-field" style="display: none;">
                        <div class="condo-visitor-form-group">
                            <label for="vehicle_plate">Placa del Vehículo</label>
                            <input type="text" id="vehicle_plate" name="vehicle_plate" placeholder="Ej: ABC-123" maxlength="20">
                        </div>
                    </div>
                    
                    <button type="submit" class="condo-visitor-btn" id="register-arrival-btn">
                        Registrar Llegada
                    </button>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Visitantes de Hoy -->
    <div class="condo-visitor-section">
        <h3>Visitantes de Hoy</h3>
        
        <div class="condo-visitor-form">
            <table class="condo-visitor-table" id="todays-visitors">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Propietario</th>
                        <th>Tipo</th>
                        <th>Fecha de Visita</th>
                        <th>Tipo de Entrada</th>
                        <th>Placa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" style="text-align: center;">Cargando visitantes de hoy...</td>
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
            
            <table class="condo-visitor-table" id="visit-history">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Propietario</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Tipo de Entrada</th>
                        <th>Placa</th>
                        <th>Última Llegada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" style="text-align: center;">Cargando historial de visitas...</td>
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
            var visitDate = visitor.visit_date || 'Frecuente';
            var arrivalTime = visitor.arrival_datetime || 'No registrada';
            var entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
            var vehiclePlate = visitor.vehicle_plate || '-';
            var actionButton = visitor.arrival_datetime ? 
              '<span style="color: green;">✓ Llegada registrada</span>' : 
              '<button class="condo-visitor-btn log-arrival-btn" data-visitor-id="' + visitor.id + '">Registrar Llegada</button>';
            
            var row = '<tr>' +
              '<td>' + visitor.first_name + ' ' + visitor.last_name + '</td>' +
              '<td>' + visitor.id_card + '</td>' +
              '<td>' + visitor.owner_name + '</td>' +
              '<td>' + (visitor.visit_type === 'unique' ? 'Única' : 'Frecuente') + '</td>' +
              '<td>' + visitDate + '</td>' +
              '<td>' + entryType + '</td>' +
              '<td>' + vehiclePlate + '</td>' +
              '<td>' + actionButton + '</td>' +
              '</tr>';
            tbody.append(row);
          });
        } else {
          tbody.append('<tr><td colspan="8" style="text-align:center;">No hay visitantes de hoy.</td></tr>');
        }
      },
      error: function() {
        console.error('Error al obtener visitantes de hoy');
        var tbody = $('#todays-visitors tbody');
        tbody.empty();
        tbody.append('<tr><td colspan="6" style="text-align:center; color: red;">Error al cargar visitantes de hoy.</td></tr>');
      }
    });
  }

  // Función para cargar historial de visitas
  function loadVisitHistory(date) {
    $.ajax({
      url: condo_visitor_ajax.api_url + '/history/date/' + encodeURIComponent(date),
      method: 'GET',
      success: function(response) {
        var tbody = $('#visit-history tbody');
        tbody.empty();
        if (response.visitors && response.visitors.length > 0) {
          response.visitors.forEach(function(visit) {
            var visitDate = visit.visit_date || 'Frecuente';
            var arrivalTime = visit.arrival_datetime || 'No registrada';
            var entryType = visit.log_visit_type ? (visit.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
            var vehiclePlate = visit.vehicle_plate || '-';
            
            var row = '<tr>' +
              '<td>' + visit.first_name + ' ' + visit.last_name + '</td>' +
              '<td>' + visit.id_card + '</td>' +
              '<td>' + visit.owner_name + '</td>' +
              '<td>' + (visit.visit_type === 'unique' ? 'Única' : 'Frecuente') + '</td>' +
              '<td>' + visitDate + '</td>' +
              '<td>' + entryType + '</td>' +
              '<td>' + vehiclePlate + '</td>' +
              '<td>' + arrivalTime + '</td>' +
              '</tr>';
            tbody.append(row);
          });
        } else {
          tbody.append('<tr><td colspan="8" style="text-align:center;">No hay historial de visitas para esta fecha.</td></tr>');
        }
      },
      error: function() {
        console.error('Error al obtener historial de visitas');
        var tbody = $('#visit-history tbody');
        tbody.empty();
        tbody.append('<tr><td colspan="6" style="text-align:center; color: red;">Error al cargar historial de visitas.</td></tr>');
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

  // Manejar cambio de tipo de visita (peatonal/vehículo)
  $('input[name="visit_type"]').change(function() {
    if ($(this).val() === 'vehicle') {
      $('#vehicle-plate-field').show();
      $('#vehicle_plate').prop('required', true);
    } else {
      $('#vehicle-plate-field').hide();
      $('#vehicle_plate').prop('required', false).val('');
    }
  });

  // Manejar formulario de registro de llegada
  $('#arrival-form').on('submit', function(e) {
    e.preventDefault();
    
    const visitType = $('input[name="visit_type"]:checked').val();
    const vehiclePlate = $('#vehicle_plate').val().trim();
    const visitorId = $('#arrival-form').data('visitor-id');
    
    // Validar placa si es vehículo
    if (visitType === 'vehicle' && !vehiclePlate) {
      alert('Por favor ingrese la placa del vehículo');
      return;
    }
    
    const submitBtn = $('#register-arrival-btn');
    const originalBtnText = submitBtn.text();
    
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
        $('#arrival-registration-form').hide();
        $('#validation-result').empty();
        $('#id_card_search').val('');
        
        // Recargar las tablas
        loadTodaysVisitors();
        var selectedDate = $('#history-date-filter').val();
        loadVisitHistory(selectedDate);
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
});
</script>