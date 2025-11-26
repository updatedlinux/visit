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
    
    <!-- Botones para gestión de visitas y deliverys -->
    <div class="condo-visitor-section">
        <div class="condo-visitor-buttons-container">
            <button class="condo-visitor-btn condo-visitor-btn-primary" id="open-create-visit-modal">
                <i class="dashicons dashicons-plus-alt"></i> Crear Anuncio de Visita Única
            </button>
            <button class="condo-visitor-btn condo-visitor-btn-primary" id="open-create-delivery-modal">
                <i class="dashicons dashicons-megaphone"></i> Creación de Anuncio de Delivery
            </button>
            <button class="condo-visitor-btn condo-visitor-btn-primary" id="open-delivery-management-modal">
                <i class="dashicons dashicons-cart"></i> Gestión de Deliverys
            </button>
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
    
    <!-- Historial de Deliverys -->
    <div class="condo-visitor-section">
        <h3>Historial de Deliverys</h3>
        
        <div class="condo-visitor-form">
            <div class="condo-visitor-search-container">
                <input type="date" id="delivery-history-date-filter">
                <button class="condo-visitor-btn" id="filter-delivery-history-btn">Filtrar</button>
            </div>
            
            <table class="condo-visitor-table" id="delivery-history">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Fecha de Llegada</th>
                        <th>Propietario</th>
                        <th>Email del Propietario</th>
                        <th>Estado</th>
                        <th>Total de Llegadas</th>
                        <th>Hora de Llegada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" style="text-align: center;">Cargando historial de deliverys...</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Paginación para Historial de Deliverys -->
            <div id="delivery-history-pagination" class="condo-visitor-pagination" style="display: none;">
                <button id="delivery-history-prev" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Anterior</button>
                <span id="delivery-history-page-info">Página 1 de 1</span>
                <button id="delivery-history-next" class="condo-visitor-btn condo-visitor-btn-secondary" disabled>Siguiente</button>
            </div>
            
            <!-- Botón de descarga de reporte Excel -->
            <div style="text-align: center; margin-top: 20px;">
                <button id="download-delivery-excel-report" class="condo-visitor-btn condo-visitor-btn-primary" style="background-color: #17a2b8;">
                    📊 Descargar Reporte de Deliverys
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

<!-- Modal para Creación de Anuncio de Delivery -->
<div id="create-delivery-modal" class="condo-visitor-modal">
    <div class="condo-visitor-modal-content">
        <div class="condo-visitor-modal-header">
            <h3>Creación de Anuncio de Delivery</h3>
            <button class="condo-visitor-modal-close" id="close-create-delivery-modal">&times;</button>
        </div>
        
        <div class="condo-visitor-modal-body">
            <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #1976D2; font-size: 14px; line-height: 1.5;">
                    <strong>📞 Uso de esta opción:</strong> Use esta opción cuando un propietario llame por teléfono para anunciar un delivery. Complete los datos del delivery (nombre, empresa) y seleccione el propietario que está solicitando el delivery.
                </p>
            </div>
            
            <form id="create-delivery-form">
                <div class="condo-visitor-form-group">
                    <label for="modal_delivery_name">Nombre y/o Apellido</label>
                    <input type="text" id="modal_delivery_name" name="name" placeholder="Ej: Juan Pérez o Delivery Express" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="modal_delivery_date_display">Fecha de Llegada del Delivery</label>
                    <input type="text" id="modal_delivery_date_display" readonly style="background-color: #f5f5f5; cursor: not-allowed;">
                    <input type="hidden" id="modal_delivery_date" name="delivery_date">
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="modal_delivery_company">Empresa</label>
                    <input type="text" id="modal_delivery_company" name="company" placeholder="Ej: PedidosYa, Rappi, Delivery Express" required>
                </div>
                
                <div class="condo-visitor-form-group">
                    <label for="modal_delivery_owner_search">Propietario Solicitante</label>
                    <div class="condo-visitor-autocomplete-container">
                        <input type="text" id="modal_delivery_owner_search" placeholder="Busque por nombre o correo del propietario..." autocomplete="off" required>
                        <input type="hidden" id="modal_delivery_owner_id" name="wp_user_id">
                        <div id="modal-delivery-owner-suggestions" class="condo-visitor-suggestions"></div>
                    </div>
                    <small style="color: #666; font-size: 12px;">Escriba para buscar y seleccionar el propietario</small>
                </div>
                
                <div class="condo-visitor-modal-footer">
                    <button type="button" class="condo-visitor-btn condo-visitor-btn-secondary" id="cancel-create-delivery">Cancelar</button>
                    <button type="submit" class="condo-visitor-btn condo-visitor-btn-primary">Registrar Delivery</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal para Gestión de Deliverys -->
<div id="delivery-management-modal" class="condo-visitor-modal">
    <div class="condo-visitor-modal-content">
        <div class="condo-visitor-modal-header">
            <h3>Gestión de Deliverys</h3>
            <button class="condo-visitor-modal-close" id="close-delivery-management-modal">&times;</button>
        </div>
        
        <div class="condo-visitor-modal-body">
            <p class="condo-visitor-description">
                Busque deliverys por nombre o correo del propietario.
            </p>
            <p style="font-size: 13px; color: #666; margin-top: -10px; margin-bottom: 15px; font-style: italic;">
                <strong>Nota:</strong> Solo se muestran los deliverys del día actual. Use el "Historial de Deliverys" para ver deliverys anteriores.
            </p>
            
            <div class="condo-visitor-form-group">
                <label for="delivery-search-input">Buscar por Propietario:</label>
                <div class="condo-visitor-autocomplete-container">
                    <input type="text" id="delivery-search-input" placeholder="Escriba el nombre o correo del propietario..." style="width: 100%;">
                    <div id="delivery-suggestions" class="condo-visitor-suggestions"></div>
                </div>
            </div>
            
            <div id="delivery-search-results" style="margin-top: 20px;">
                <p style="text-align: center; color: #7f8c8d;">Escriba el nombre o correo del propietario para buscar deliverys.</p>
            </div>
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
  let deliveryHistoryPage = 1;
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
  
  function renderDeliveryHistoryTable(deliverys) {
    const tbody = $('#delivery-history tbody');
    tbody.empty();
    
    if (deliverys.length === 0) {
      tbody.append('<tr><td colspan="8" style="text-align: center;">No hay deliverys para esta fecha</td></tr>');
      return;
    }
    
    deliverys.forEach(function(delivery) {
      const statusClass = delivery.status === 'announced' ? 'condo-visitor-status-pending' : 'condo-visitor-status-active';
      const statusText = delivery.status_text || (delivery.status === 'announced' ? 'Anunciado' : 'Llegada Registrada');
      const arrivalCount = delivery.arrival_count || 0;
      const arrivalTime = delivery.arrival_datetime || 'No registrada';
      
      const row = $('<tr></tr>');
      row.append('<td>' + (delivery.name || '-') + '</td>');
      row.append('<td>' + (delivery.company || '-') + '</td>');
      row.append('<td>' + (delivery.delivery_date || '-') + '</td>');
      row.append('<td>' + (delivery.owner_name || delivery.owner_nicename || '-') + '</td>');
      row.append('<td>' + (delivery.owner_email || '-') + '</td>');
      row.append('<td><span class="' + statusClass + '">' + statusText + '</span></td>');
      row.append('<td>' + arrivalCount + '</td>');
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

  // Función para cargar historial de deliverys
  function loadDeliveryHistory(date) {
    $.ajax({
      url: 'https://api.bonaventurecclub.com/visit/delivery/history/date?date=' + encodeURIComponent(date),
      method: 'GET',
      success: function(response) {
        if (response.deliverys && response.deliverys.length > 0) {
          // Aplicar paginación
          const paginatedDeliverys = updatePaginationControls(
            response.deliverys, 
            deliveryHistoryPage, 
            'delivery-history-pagination', 
            'delivery-history-prev', 
            'delivery-history-next', 
            'delivery-history-page-info'
          );
          
          // Renderizar tabla con datos paginados
          renderDeliveryHistoryTable(paginatedDeliverys);
        } else {
          $('#delivery-history tbody').html('<tr><td colspan="8" style="text-align: center;">No hay historial de deliverys para esta fecha</td></tr>');
          $('#delivery-history-pagination').hide();
        }
      },
      error: function() {
        console.error('Error al obtener historial de deliverys');
        var tbody = $('#delivery-history tbody');
        tbody.empty();
        tbody.append('<tr><td colspan="8" style="text-align:center; color: red;">Error al cargar historial de deliverys.</td></tr>');
      }
    });
  }

  // Establecer fecha por defecto a hoy
  $('#history-date-filter').val(new Date().toISOString().split('T')[0]);
  $('#delivery-history-date-filter').val(new Date().toISOString().split('T')[0]);

  // Cargar visitantes de hoy al cargar la página
  loadTodaysVisitors();

  // Cargar historial de visitas al cargar la página
  loadVisitHistory($('#history-date-filter').val());

  // Cargar historial de deliverys al cargar la página
  loadDeliveryHistory($('#delivery-history-date-filter').val());

  // Refrescar visitantes de hoy cada 5 segundos
  var todaysInterval = setInterval(loadTodaysVisitors, 5000);

  // Filtrar historial de visitas por fecha
  $('#filter-history-btn').click(function(e) {
    e.preventDefault();
    visitHistoryPage = 1; // Reiniciar página al cambiar fecha
    var selectedDate = $('#history-date-filter').val();
    loadVisitHistory(selectedDate);
  });

  // Filtrar historial de deliverys por fecha
  $('#filter-delivery-history-btn').click(function(e) {
    e.preventDefault();
    deliveryHistoryPage = 1; // Reiniciar página al cambiar fecha
    var selectedDate = $('#delivery-history-date-filter').val();
    loadDeliveryHistory(selectedDate);
  });

  // Manejadores de eventos para paginación de Historial de Deliverys
  $('#delivery-history-prev').click(function() {
    if (deliveryHistoryPage > 1) {
      deliveryHistoryPage--;
      var selectedDate = $('#delivery-history-date-filter').val();
      loadDeliveryHistory(selectedDate);
    }
  });
  
  $('#delivery-history-next').click(function() {
    deliveryHistoryPage++;
    var selectedDate = $('#delivery-history-date-filter').val();
    loadDeliveryHistory(selectedDate);
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
  
  // Función para obtener la fecha local de Venezuela (GMT-4)
  function getVenezuelaDate() {
    const now = new Date();
    // getTimezoneOffset() devuelve minutos con signo invertido
    // Para UTC-4 (Venezuela), devuelve 240 (no -240)
    // Venezuela está en UTC-4, así que su offset en minutos es 240
    const venezuelaOffsetMinutes = 4 * 60; // 240 minutos (UTC-4)
    const localOffsetMinutes = now.getTimezoneOffset(); // Offset local (ya con signo invertido)
    const offsetDiffMinutes = venezuelaOffsetMinutes - localOffsetMinutes;
    const venezuelaTime = new Date(now.getTime() + offsetDiffMinutes * 60 * 1000);
    
    // Usar métodos locales (no UTC) para obtener la fecha de Venezuela
    const year = venezuelaTime.getFullYear();
    const month = String(venezuelaTime.getMonth() + 1).padStart(2, '0');
    const day = String(venezuelaTime.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }
  
  // Manejadores de eventos para modal de Creación de Anuncio de Delivery
  $('#open-create-delivery-modal').click(function(e) {
    e.preventDefault();
    $('#create-delivery-modal').addClass('show');
    
    // Establecer fecha actual usando función helper
    const formattedDate = getVenezuelaDate();
    const formattedDateDisplay = new Date().toLocaleDateString('es-VE', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    $('#modal_delivery_date').val(formattedDate);
    $('#modal_delivery_date_display').val(formattedDateDisplay);
    
    // Limpiar campos
    $('#modal_delivery_name').val('');
    $('#modal_delivery_company').val('');
    $('#modal_delivery_owner_search').val('');
    $('#modal_delivery_owner_id').val('');
    $('#modal-delivery-owner-suggestions').empty();
  });
  
  $('#close-create-delivery-modal, #cancel-create-delivery').click(function() {
    $('#create-delivery-modal').removeClass('show');
    $('#create-delivery-form')[0].reset();
    $('#modal-delivery-owner-suggestions').empty();
  });
  
  // Búsqueda de propietarios para el modal de creación de delivery
  let modalDeliveryOwnerSearchTimeout;
  $('#modal_delivery_owner_search').on('input', function() {
    const query = $(this).val().trim();
    const suggestionsContainer = $('#modal-delivery-owner-suggestions');
    
    clearTimeout(modalDeliveryOwnerSearchTimeout);
    
    if (query.length < 2) {
      suggestionsContainer.empty();
      $('#modal_delivery_owner_id').val('');
      return;
    }
    
    modalDeliveryOwnerSearchTimeout = setTimeout(function() {
      $.ajax({
        url: 'https://api.bonaventurecclub.com/visit/users?search=' + encodeURIComponent(query),
        method: 'GET',
        success: function(response) {
          suggestionsContainer.empty();
          
          if (response.users && response.users.length > 0) {
            response.users.forEach(function(user) {
              const suggestionItem = $('<div class="condo-visitor-suggestion-item">');
              suggestionItem.text(user.display_name + ' (' + user.user_email + ')');
              suggestionItem.data('user', user);
              suggestionItem.click(function() {
                $('#modal_delivery_owner_search').val(user.display_name);
                $('#modal_delivery_owner_id').val(user.ID);
                suggestionsContainer.empty();
              });
              suggestionsContainer.append(suggestionItem);
            });
            suggestionsContainer.show();
          } else {
            suggestionsContainer.empty();
          }
        },
        error: function() {
          suggestionsContainer.empty();
        }
      });
    }, 300);
  });
  
  // Cerrar sugerencias del modal de delivery al hacer clic fuera
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.condo-visitor-autocomplete-container').length && 
        !$(e.target).is('#modal_delivery_owner_search')) {
      $('#modal-delivery-owner-suggestions').empty();
    }
  });
  
  // Manejar envío del formulario de creación de delivery
  $('#create-delivery-form').on('submit', function(e) {
    e.preventDefault();
    
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    const originalBtnText = submitBtn.text();
    
    // Validar que se haya seleccionado un propietario
    const wpUserId = $('#modal_delivery_owner_id').val();
    if (!wpUserId) {
      showMessage('Debe seleccionar un propietario válido de la lista', 'error');
      return;
    }
    
    submitBtn.prop('disabled', true).text('Registrando...');
    
    const formData = {
      wp_user_id: wpUserId,
      name: $('#modal_delivery_name').val(),
      company: $('#modal_delivery_company').val(),
      delivery_date: $('#modal_delivery_date').val()
    };
    
    $.ajax({
      url: 'https://api.bonaventurecclub.com/visit/delivery/new',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        submitBtn.prop('disabled', false).text(originalBtnText);
        showMessage('Delivery registrado exitosamente', 'success');
        $('#create-delivery-modal').removeClass('show');
        form[0].reset();
        $('#modal-delivery-owner-suggestions').empty();
        // Restablecer fecha actual usando función helper
        const formattedDate = getVenezuelaDate();
        const formattedDateDisplay = new Date().toLocaleDateString('es-VE', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        });
        $('#modal_delivery_date').val(formattedDate);
        $('#modal_delivery_date_display').val(formattedDateDisplay);
      },
      error: function(xhr) {
        submitBtn.prop('disabled', false).text(originalBtnText);
        let errorMessage = 'Error al registrar el delivery';
        if (xhr.responseJSON && xhr.responseJSON.error) {
          errorMessage = xhr.responseJSON.error;
        }
        showMessage(errorMessage, 'error');
      }
    });
  });
  
  // Manejadores de eventos para modal de Gestión de Deliverys
  $('#open-delivery-management-modal').click(function(e) {
    e.preventDefault();
    $('#delivery-management-modal').addClass('show');
  });
  
  $('#close-delivery-management-modal').click(function() {
    $('#delivery-management-modal').removeClass('show');
    $('#delivery-search-input').val('');
    $('#delivery-search-results').html('<p style="text-align: center; color: #7f8c8d;">Ingrese un término de búsqueda para comenzar.</p>');
  });
  
  // Cerrar modal al hacer clic fuera
  $(document).click(function(event) {
    if ($(event.target).hasClass('condo-visitor-modal') && $(event.target).attr('id') === 'delivery-management-modal') {
      $('#delivery-management-modal').removeClass('show');
      $('#delivery-search-input').val('');
      $('#delivery-search-results').html('<p style="text-align: center; color: #7f8c8d;">Ingrese un término de búsqueda para comenzar.</p>');
    }
  });
  
  // Cerrar modal con tecla ESC
  $(document).keydown(function(event) {
    if (event.keyCode === 27) { // ESC key
      $('#delivery-management-modal').removeClass('show');
    }
  });
  
  // Búsqueda en tiempo real de deliverys
  let deliverySearchTimeout;
  $('#delivery-search-input').on('input', function() {
    const query = $(this).val().trim();
    const suggestionsContainer = $('#delivery-suggestions');
    
    // Limpiar timeout anterior
    clearTimeout(deliverySearchTimeout);
    
    if (query.length < 2) {
      suggestionsContainer.empty();
      $('#delivery-search-results').html('<p style="text-align: center; color: #7f8c8d;">Escriba al menos 2 caracteres para buscar.</p>');
      return;
    }
    
    // Debounce la búsqueda
    deliverySearchTimeout = setTimeout(function() {
      performDeliverySearch(query);
    }, 300);
  });
  
  // Cerrar sugerencias al hacer clic fuera
  $(document).click(function(e) {
    if (!$(e.target).closest('.condo-visitor-autocomplete-container').length) {
      $('#delivery-suggestions').empty();
    }
  });
  
  function performDeliverySearch(searchTerm) {
    if (!searchTerm) {
      searchTerm = $('#delivery-search-input').val().trim();
    }
    
    if (!searchTerm || searchTerm.length < 2) {
      return;
    }
    
    const resultsContainer = $('#delivery-search-results');
    resultsContainer.html('<p style="text-align: center; color: #7f8c8d;">Buscando...</p>');
    
    $.ajax({
      url: 'https://api.bonaventurecclub.com/visit/delivery/search',
      method: 'GET',
      data: { search: searchTerm },
      success: function(response) {
        if (response.deliverys && response.deliverys.length > 0) {
          let html = '<div class="condo-visitor-table-container">';
          html += '<table class="condo-visitor-table">';
          html += '<thead><tr>';
          html += '<th>Nombre</th>';
          html += '<th>Empresa</th>';
          html += '<th>Fecha de Llegada</th>';
          html += '<th>Propietario</th>';
          html += '<th>Email</th>';
          html += '<th>Estado</th>';
          html += '<th>Llegadas</th>';
          html += '<th>Acción</th>';
          html += '</tr></thead>';
          html += '<tbody>';
          
          response.deliverys.forEach(function(delivery) {
            const statusClass = delivery.status === 'announced' ? 'condo-visitor-status-pending' : 'condo-visitor-status-active';
            const statusText = delivery.status_text || (delivery.status === 'announced' ? 'Anunciado' : 'Llegada Registrada');
            const arrivalCount = delivery.arrival_count || 0;
            
            html += '<tr>';
            html += '<td>' + (delivery.name || '-') + '</td>';
            html += '<td>' + (delivery.company || '-') + '</td>';
            html += '<td>' + (delivery.delivery_date || '-') + '</td>';
            html += '<td>' + (delivery.owner_name || delivery.owner_nicename || '-') + '</td>';
            html += '<td>' + (delivery.owner_email || '-') + '</td>';
            html += '<td><span class="' + statusClass + '">' + statusText + '</span></td>';
            html += '<td>' + arrivalCount + '</td>';
            html += '<td>';
            html += '<button class="condo-visitor-btn condo-visitor-btn-small register-delivery-arrival" ';
            html += 'data-delivery-id="' + delivery.id + '" ';
            html += 'data-delivery-name="' + (delivery.name || '') + '">';
            html += 'Registrar Llegada';
            html += '</button>';
            html += '</td>';
            html += '</tr>';
          });
          
          html += '</tbody></table></div>';
          resultsContainer.html(html);
        } else {
          resultsContainer.html('<p class="condo-visitor-no-data">No se encontraron deliverys para este propietario en el día actual.</p>');
        }
      },
      error: function(xhr) {
        let errorMessage = 'Error al buscar deliverys';
        if (xhr.responseJSON && xhr.responseJSON.error) {
          errorMessage = xhr.responseJSON.error;
        }
        showMessage(errorMessage, 'error');
        resultsContainer.html('<p class="condo-visitor-error">Error al realizar la búsqueda.</p>');
      }
    });
  }
  
  // Manejar registro de llegada de delivery
  $(document).on('click', '.register-delivery-arrival', function() {
    const btn = $(this);
    const deliveryId = btn.data('delivery-id');
    const deliveryName = btn.data('delivery-name');
    const originalText = btn.text();
    
    if (!deliveryId) {
      showMessage('Error: ID de delivery no válido', 'error');
      return;
    }
    
    // Confirmar acción
    if (!confirm('¿Desea registrar la llegada del delivery "' + deliveryName + '"?')) {
      return;
    }
    
    // Deshabilitar botón
    btn.prop('disabled', true).text('Registrando...');
    
    $.ajax({
      url: 'https://api.bonaventurecclub.com/visit/delivery/arrival/' + deliveryId,
      method: 'POST',
      success: function(response) {
        showMessage('Llegada de delivery registrada exitosamente', 'success');
        
        // Recargar resultados
        const searchTerm = $('#delivery-search-input').val().trim();
        if (searchTerm) {
          performDeliverySearch(searchTerm);
        }
      },
      error: function(xhr) {
        let errorMessage = 'Error al registrar la llegada del delivery';
        if (xhr.responseJSON && xhr.responseJSON.error) {
          errorMessage = xhr.responseJSON.error;
        }
        showMessage(errorMessage, 'error');
        btn.prop('disabled', false).text(originalText);
      }
    });
  });
  
  // Manejador de evento para descarga de reporte Excel de visitas
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

  // Manejador de evento para descarga de reporte Excel de deliverys
  $('#download-delivery-excel-report').click(function() {
    var selectedDate = $('#delivery-history-date-filter').val();
    if (!selectedDate) {
      showMessage('Por favor seleccione una fecha para generar el reporte', 'error');
      return;
    }
    
    // Deshabilitar botón y mostrar carga
    var btn = $(this);
    var originalText = btn.html();
    btn.prop('disabled', true).html('📊 Generando Excel...');
    
    // Crear URL para descargar el Excel
    var excelUrl = 'https://api.bonaventurecclub.com/visit/delivery/report/excel/' + selectedDate;
    
    // Crear enlace temporal para descarga
    var link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'reporte-deliverys-' + selectedDate + '.xlsx';
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