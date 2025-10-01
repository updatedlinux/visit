<div class="condo-visitor-container">
    <h2>Dashboard de Seguridad</h2>
    
    <!-- Pestañas de navegación -->
    <div class="condo-visitor-tabs">
        <button class="condo-visitor-tab-btn active" data-tab="validation">Validar Visitante</button>
        <button class="condo-visitor-tab-btn" data-tab="create-visit">Creación de Anuncio de Visita Única</button>
    </div>
    
    <!-- Pestaña: Validación de Visitantes -->
    <div id="validation-tab" class="condo-visitor-tab-content active">
        <div class="condo-visitor-section">
            <h3>Validar Visitante</h3>
            
            <div class="condo-visitor-form">
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
                        
                        <button type="submit" class="condo-visitor-btn" id="register-arrival-btn" disabled>
                            Registrar Llegada
                        </button>
                    </form>
                </div>
        </div>
    </div>
    
    <!-- Botón para abrir modal de creación de visita -->
    <div class="condo-visitor-section">
        <button class="condo-visitor-btn condo-visitor-btn-primary" id="open-create-visit-modal">
            <i class="dashicons dashicons-plus-alt"></i> Crear Anuncio de Visita Única
        </button>
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

<div class="condo-visitor-container">
    <h2>Dashboard de Seguridad</h2>
    
    <!-- Validación de Visitantes -->
    <div class="condo-visitor-section">
        <h3>Validar Visitante</h3>
        
        <div class="condo-visitor-form">
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
                    
                    <button type="submit" class="condo-visitor-btn" id="register-arrival-btn" disabled>
                        Registrar Llegada
                    </button>
                </form>
            </div>
    </div>
</div>

<!-- Modal para Creación de Anuncio de Visita Única -->
<div id="create-visit-modal" class="condo-visitor-modal">
    <div class="condo-visitor-modal-content">
        <div class="condo-visitor-modal-header">
            <h3>Creación de Anuncio de Visita Única</h3>
            <button class="condo-visitor-modal-close" id="close-create-visit-modal">&times;</button>
        </div>
        
        <div class="condo-visitor-modal-body">
            <p class="condo-visitor-description">
                Use esta opción cuando un propietario llame por teléfono para anunciar una visita única. 
                Complete los datos del visitante y la fecha de visita.
            </p>
            
            <form id="security-create-visit-form">
                <div class="condo-visitor-form-group">
                    <label for="security_first_name">Nombre del Visitante:</label>
                    <input type="text" id="security_first_name" name="first_name" placeholder="Ej: Juan" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="security_last_name">Apellido del Visitante:</label>
                    <input type="text" id="security_last_name" name="last_name" placeholder="Ej: Pérez" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="security_id_card">Número de Cédula:</label>
                    <input type="text" id="security_id_card" name="id_card" placeholder="Ej: 12345678" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="security_visit_date">Fecha de Visita:</label>
                    <input type="date" id="security_visit_date" name="visit_date" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="security_propietario">Propietario que Anuncia:</label>
                    <select id="security_propietario" name="wp_user_id" required>
                        <option value="">Seleccione el propietario</option>
                        <!-- Las opciones se cargarán dinámicamente -->
                    </select>
                </div>
                
                <div class="condo-visitor-modal-footer">
                    <button type="button" class="condo-visitor-btn condo-visitor-btn-secondary" id="cancel-create-visit">
                        Cancelar
                    </button>
                    <button type="submit" class="condo-visitor-btn condo-visitor-btn-primary">
                        Crear Anuncio de Visita
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
  console.log('Script del dashboard cargado correctamente');
  console.log('Modal encontrado:', $('#create-visit-modal').length);
  console.log('Botón encontrado:', $('#open-create-visit-modal').length);
  
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
    const submitBtn = $('#register-arrival-btn');
    
    if ($(this).val() === 'vehicle') {
      $('#vehicle-plate-field').show();
      $('#vehicle_plate').prop('required', true);
      submitBtn.prop('disabled', true); // Deshabilitar hasta que se ingrese placa
    } else {
      $('#vehicle-plate-field').hide();
      $('#vehicle_plate').prop('required', false).val('');
      submitBtn.prop('disabled', false); // Habilitar para peatonal
    }
  });
  
  // Manejar cambio en campo de placa para habilitar/deshabilitar botón
  $('#vehicle_plate').on('input', function() {
    const submitBtn = $('#register-arrival-btn');
    const plateValue = $(this).val().trim();
    
    // Habilitar botón solo si hay placa válida
    if (plateValue.length > 0) {
      submitBtn.prop('disabled', false);
    } else {
      submitBtn.prop('disabled', true);
    }
  });

  // Manejar formulario de registro de llegada
  $('#arrival-form').on('submit', function(e) {
    e.preventDefault();
    
    const visitType = $('input[name="visit_type"]:checked').val();
    const vehiclePlate = $('#vehicle_plate').val().trim();
    const visitorId = $('#arrival-registration-form').data('visitor-id');
    const submitBtn = $('#register-arrival-btn');
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
  
  // Manejar apertura del modal
  $('#open-create-visit-modal').click(function(e) {
    e.preventDefault();
    console.log('Click en botón detectado!');
    console.log('Modal antes de mostrar:', $('#create-visit-modal').hasClass('show'));
    $('#create-visit-modal').addClass('show');
    console.log('Modal después de mostrar:', $('#create-visit-modal').hasClass('show'));
    loadPropietarios();
  });
  
  // Manejar cierre del modal
  $('#close-create-visit-modal, #cancel-create-visit').click(function() {
    console.log('Cerrando modal...');
    $('#create-visit-modal').removeClass('show');
  });
  
  // Cerrar modal al hacer click fuera del contenido
  $(document).click(function(event) {
    if ($(event.target).hasClass('condo-visitor-modal')) {
      $('#create-visit-modal').removeClass('show');
    }
  });
  
  // Cerrar modal con tecla ESC
  $(document).keydown(function(event) {
    if (event.keyCode === 27) { // ESC key
      $('#create-visit-modal').removeClass('show');
    }
  });
  
  // Cargar lista de propietarios
  function loadPropietarios() {
    console.log('Iniciando carga de propietarios...');
    $.ajax({
      url: condo_visitor_ajax.api_url + '/users',
      method: 'GET',
      success: function(response) {
        console.log('Respuesta de usuarios:', response);
        const select = $('#security_propietario');
        select.empty();
        select.append('<option value="">Seleccione el propietario</option>');
        
        if (response.users && response.users.length > 0) {
          response.users.forEach(function(user) {
            select.append('<option value="' + user.ID + '">' + user.display_name + ' (' + user.user_email + ')</option>');
          });
          console.log('Propietarios cargados:', response.users.length);
        } else {
          console.log('No se encontraron usuarios');
        }
      },
      error: function() {
        console.error('Error al cargar propietarios');
        $('#security_propietario').html('<option value="">Error al cargar propietarios</option>');
      }
    });
  }
  
  // Establecer fecha por defecto a hoy
  $('#security_visit_date').val(new Date().toISOString().split('T')[0]);
  
  // Manejar formulario de creación de visita
  $('#security-create-visit-form').on('submit', function(e) {
    e.preventDefault();
    
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    const originalBtnText = submitBtn.text();
    
    // Deshabilitar botón y mostrar carga
    submitBtn.prop('disabled', true).text('Creando...');
    
    // Obtener datos del formulario
    const formData = {
      wp_user_id: form.find('select[name="wp_user_id"]').val(),
      first_name: form.find('input[name="first_name"]').val(),
      last_name: form.find('input[name="last_name"]').val(),
      id_card: form.find('input[name="id_card"]').val(),
      visit_date: form.find('input[name="visit_date"]').val(),
      visit_type: 'unique'
    };
    
    // Enviar solicitud AJAX
    $.ajax({
      url: condo_visitor_ajax.api_url + '/new',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        showMessage('Anuncio de visita creado exitosamente', 'success');
        // Limpiar campos manualmente
        form.find('input[type="text"]').val('');
        form.find('input[type="date"]').val('');
        form.find('select').prop('selectedIndex', 0);
        // Establecer fecha por defecto a hoy
        $('#security_visit_date').val(new Date().toISOString().split('T')[0]);
        
        // Cerrar modal
        $('#create-visit-modal').removeClass('show');
        
        // Recargar las tablas
        loadTodaysVisitors();
        var selectedDate = $('#history-date-filter').val();
        loadVisitHistory(selectedDate);
      },
      error: function(xhr) {
        let errorMessage = 'Error al crear el anuncio de visita';
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