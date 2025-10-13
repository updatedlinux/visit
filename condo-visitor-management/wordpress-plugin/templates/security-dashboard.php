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
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" style="text-align: center;">Cargando visitantes de hoy...</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Paginación para Visitantes de Hoy -->
            <div id="todays-visitors-pagination" class="condo-visitor-pagination" style="display: none;">
                <button id="todays-prev" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Anterior</button>
                <span id="todays-page-info">Página 1 de 1</span>
                <button id="todays-next" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Siguiente</button>
            </div>
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
            
            <!-- Paginación para Historial de Visitas -->
            <div id="visit-history-pagination" class="condo-visitor-pagination" style="display: none;">
                <button id="history-prev" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Anterior</button>
                <span id="history-page-info">Página 1 de 1</span>
                <button id="history-next" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Siguiente</button>
            </div>
            
            <!-- Botón de descarga de reporte Excel -->
            <div style="text-align: center; margin-top: 20px;">
                <button id="download-excel-report" class="condo-visitor-btn condo-visitor-btn-primary" style="background-color: #28a745;">
                    📊 Descargar Reporte de Visitas
                </button>
            </div>
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
                    <div class="condo-visitor-autocomplete-container">
                        <input type="text" id="security_propietario" name="propietario_search" placeholder="Escriba el nombre o email del propietario..." required>
                        <input type="hidden" id="security_wp_user_id" name="wp_user_id" required>
                        <div id="propietario-suggestions" class="condo-visitor-suggestions"></div>
                    </div>
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
  
  // Variables de paginación
  let todaysVisitorsPage = 1;
  let visitHistoryPage = 1;
  const itemsPerPage = 20;
  
  // Función para mostrar mensajes
  function showMessage(message, type) {
    // Crear elemento de mensaje
    const messageDiv = $('<div class="condo-visitor-message condo-visitor-message-' + type + '">' + message + '</div>');
    
    // Agregar al contenedor
    $('.condo-visitor-container').prepend(messageDiv);
    
    // Remover después de 5 segundos
    setTimeout(function() {
      messageDiv.fadeOut(function() {
        messageDiv.remove();
      });
    }, 5000);
  }
  
  // Funciones de paginación
  function updatePaginationControls(data, page, containerId, prevBtnId, nextBtnId, pageInfoId) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    
    // Mostrar/ocultar controles de paginación
    if (data.length > itemsPerPage) {
      $('#' + containerId).show();
    } else {
      $('#' + containerId).hide();
    }
    
    // Actualizar botones
    $('#' + prevBtnId).prop('disabled', page === 1);
    $('#' + nextBtnId).prop('disabled', page === totalPages);
    
    // Actualizar información de página
    $('#' + pageInfoId).text(`Página ${page} de ${totalPages}`);
    
    return data.slice(startIndex, endIndex);
  }
  
  function renderTodaysVisitorsTable(visitors) {
    const tbody = $('#todays-visitors tbody');
    tbody.empty();
    
    if (visitors.length === 0) {
      tbody.append('<tr><td colspan="8" style="text-align: center;">No hay visitantes para hoy</td></tr>');
      return;
    }
    
    visitors.forEach(function(visitor) {
      var visitDate = visitor.visit_date || 'Frecuente';
      var entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
      var vehiclePlate = visitor.vehicle_plate || '-';
      var statusText = visitor.arrival_datetime ? 
        '<span style="color: green; font-weight: bold;">✓ Registrado</span>' : 
        '<span style="color: #dc3545; font-weight: bold;">✗ No ha llegado</span>';
      
      const row = $('<tr></tr>');
      row.append('<td>' + visitor.first_name + ' ' + visitor.last_name + '</td>');
      row.append('<td>' + visitor.id_card + '</td>');
      row.append('<td>' + visitor.owner_name + '</td>');
      row.append('<td>' + (visitor.visit_type === 'unique' ? 'Única' : 'Frecuente') + '</td>');
      row.append('<td>' + visitDate + '</td>');
      row.append('<td>' + entryType + '</td>');
      row.append('<td>' + vehiclePlate + '</td>');
      row.append('<td>' + statusText + '</td>');
      tbody.append(row);
    });
  }
  
  function renderVisitHistoryTable(visitors) {
    const tbody = $('#visit-history tbody');
    tbody.empty();
    
    if (visitors.length === 0) {
      tbody.append('<tr><td colspan="8" style="text-align: center;">No hay visitas para esta fecha</td></tr>');
      return;
    }
    
    visitors.forEach(function(visitor) {
      var visitDate = visitor.visit_date || 'Frecuente';
      var entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
      var vehiclePlate = visitor.vehicle_plate || '-';
      var arrivalTime = visitor.arrival_datetime || 'No registrada';
      
      const row = $('<tr></tr>');
      row.append('<td>' + visitor.first_name + ' ' + visitor.last_name + '</td>');
      row.append('<td>' + visitor.id_card + '</td>');
      row.append('<td>' + visitor.owner_name + '</td>');
      row.append('<td>' + (visitor.visit_type === 'unique' ? 'Única' : 'Frecuente') + '</td>');
      row.append('<td>' + visitDate + '</td>');
      row.append('<td>' + entryType + '</td>');
      row.append('<td>' + vehiclePlate + '</td>');
      row.append('<td>' + arrivalTime + '</td>');
      tbody.append(row);
    });
  }
  
  // Función para cargar visitantes de hoy
  function loadTodaysVisitors() {
    $.ajax({
      url: condo_visitor_ajax.api_url + '/today',
      method: 'GET',
      success: function(response) {
        if (response.visitors && response.visitors.length > 0) {
          // Aplicar paginación
          const paginatedVisitors = updatePaginationControls(
            response.visitors, 
            todaysVisitorsPage, 
            'todays-visitors-pagination', 
            'todays-prev', 
            'todays-next', 
            'todays-page-info'
          );
          
          // Renderizar tabla con datos paginados
          renderTodaysVisitorsTable(paginatedVisitors);
        } else {
          $('#todays-visitors tbody').html('<tr><td colspan="8" style="text-align: center;">No hay visitantes para hoy</td></tr>');
          $('#todays-visitors-pagination').hide();
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
        if (response.visitors && response.visitors.length > 0) {
          // Aplicar paginación
          const paginatedVisitors = updatePaginationControls(
            response.visitors, 
            visitHistoryPage, 
            'visit-history-pagination', 
            'history-prev', 
            'history-next', 
            'history-page-info'
          );
          
          // Renderizar tabla con datos paginados
          renderVisitHistoryTable(paginatedVisitors);
        } else {
          $('#visit-history tbody').html('<tr><td colspan="8" style="text-align: center;">No hay historial de visitas para esta fecha</td></tr>');
          $('#visit-history-pagination').hide();
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
    visitHistoryPage = 1; // Reiniciar página al cambiar fecha
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
    // Limpiar campos del modal
    clearModalFields();
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
  
  // Limpiar campos del modal
  function clearModalFields() {
    $('#security_first_name').val('');
    $('#security_last_name').val('');
    $('#security_id_card').val('');
    $('#security_visit_date').val(new Date().toISOString().split('T')[0]);
    $('#security_propietario').val('');
    $('#security_wp_user_id').val('');
    $('#propietario-suggestions').empty();
  }
  
  // Búsqueda dinámica de propietarios
  let searchTimeout;
  $('#security_propietario').on('input', function() {
    const query = $(this).val().trim();
    const suggestionsContainer = $('#propietario-suggestions');
    
    // Limpiar timeout anterior
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
      suggestionsContainer.empty();
      $('#security_wp_user_id').val('');
      return;
    }
    
    // Debounce la búsqueda
    searchTimeout = setTimeout(function() {
      searchPropietarios(query);
    }, 300);
  });
  
  // Función para buscar propietarios
  function searchPropietarios(query) {
    console.log('Buscando propietarios con query:', query);
    
    $.ajax({
      url: condo_visitor_ajax.api_url + '/users',
      method: 'GET',
      success: function(response) {
        console.log('Respuesta de usuarios:', response);
        const suggestionsContainer = $('#propietario-suggestions');
        suggestionsContainer.empty();
        
        if (response.users && response.users.length > 0) {
          // Filtrar usuarios que coincidan con la búsqueda
          const filteredUsers = response.users.filter(function(user) {
            const name = user.display_name.toLowerCase();
            const email = user.user_email.toLowerCase();
            const searchTerm = query.toLowerCase();
            
            return name.includes(searchTerm) || email.includes(searchTerm);
          });
          
          if (filteredUsers.length > 0) {
            filteredUsers.forEach(function(user) {
              const suggestionItem = $('<div class="condo-visitor-suggestion-item" data-user-id="' + user.ID + '">' +
                '<strong>' + user.display_name + '</strong><br>' +
                '<small>' + user.user_email + '</small>' +
                '</div>');
              
              suggestionItem.click(function() {
                selectPropietario(user);
              });
              
              suggestionsContainer.append(suggestionItem);
            });
          } else {
            suggestionsContainer.html('<div class="condo-visitor-no-results">No se encontraron propietarios</div>');
          }
        } else {
          suggestionsContainer.html('<div class="condo-visitor-no-results">No se encontraron usuarios</div>');
        }
      },
      error: function() {
        console.error('Error al buscar propietarios');
        $('#propietario-suggestions').html('<div class="condo-visitor-error">Error al buscar propietarios</div>');
      }
    });
  }
  
  // Seleccionar propietario
  function selectPropietario(user) {
    $('#security_propietario').val(user.display_name + ' (' + user.user_email + ')');
    $('#security_wp_user_id').val(user.ID);
    $('#propietario-suggestions').empty();
    console.log('Propietario seleccionado:', user);
  }
  
  // Ocultar sugerencias al hacer click fuera
  $(document).click(function(event) {
    if (!$(event.target).closest('.condo-visitor-autocomplete-container').length) {
      $('#propietario-suggestions').empty();
    }
  });
  
  // Establecer fecha por defecto a hoy
  $('#security_visit_date').val(new Date().toISOString().split('T')[0]);
  
  // Manejar formulario de creación de visita
  $('#security-create-visit-form').on('submit', function(e) {
    e.preventDefault();
    
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    
    // Validar que se haya seleccionado un propietario válido
    const wpUserId = $('#security_wp_user_id').val();
    if (!wpUserId || wpUserId === '') {
      showMessage('Debe seleccionar un propietario válido de la lista', 'error');
      return;
    }
    
    // Deshabilitar botón y mostrar carga
    submitBtn.prop('disabled', true).text('Creando...');
    
    // Obtener datos del formulario
    const formData = {
      wp_user_id: wpUserId,
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
        clearModalFields();
        
        // Cerrar modal
        $('#create-visit-modal').removeClass('show');
        
        // Recargar las tablas
        loadTodaysVisitors();
        var selectedDate = $('#history-date-filter').val();
        loadVisitHistory(selectedDate);
        
        // Rehabilitar botón inmediatamente después del éxito
        submitBtn.prop('disabled', false).text('Crear Anuncio de Visita');
      },
      error: function(xhr) {
        let errorMessage = 'Error al crear el anuncio de visita';
        if (xhr.responseJSON && xhr.responseJSON.error) {
          errorMessage = xhr.responseJSON.error;
        }
        showMessage(errorMessage, 'error');
        
        // Rehabilitar botón en caso de error
        submitBtn.prop('disabled', false).text('Crear Anuncio de Visita');
      }
    });
  });
  
  // Manejadores de eventos para paginación de Visitantes de Hoy
  $('#todays-prev').click(function() {
    if (todaysVisitorsPage > 1) {
      todaysVisitorsPage--;
      loadTodaysVisitors();
    }
  });
  
  $('#todays-next').click(function() {
    todaysVisitorsPage++;
    loadTodaysVisitors();
  });
  
  // Manejadores de eventos para paginación de Historial de Visitas
  $('#history-prev').click(function() {
    if (visitHistoryPage > 1) {
      visitHistoryPage--;
      var selectedDate = $('#history-date-filter').val();
      loadVisitHistory(selectedDate);
    }
  });
  
  $('#history-next').click(function() {
    visitHistoryPage++;
    var selectedDate = $('#history-date-filter').val();
    loadVisitHistory(selectedDate);
  });
  
  // Manejador de evento para descarga de reporte Excel
  $('#download-excel-report').click(function() {
    var selectedDate = $('#history-date-filter').val();
    if (!selectedDate) {
      showMessage('Por favor seleccione una fecha para generar el reporte', 'error');
      return;
    }
    
    // Deshabilitar botón y mostrar carga
    var btn = $(this);
    var originalText = btn.html();
    btn.prop('disabled', true).html('📊 Generando Excel...');
    
    // Crear URL para descargar el Excel
    var excelUrl = condo_visitor_ajax.api_url + '/report/excel/' + selectedDate;
    
    // Crear enlace temporal para descarga
    var link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'reporte-visitas-' + selectedDate + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Rehabilitar botón después de un momento
    setTimeout(function() {
      btn.prop('disabled', false).html(originalText);
    }, 2000);
  });
});
</script>