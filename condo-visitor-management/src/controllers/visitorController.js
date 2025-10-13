const {
  createUniqueVisitor,
  createFrequentVisitor,
  getVisitorHistory,
  updateFrequentVisitorStatus,
  validateVisitor,
  logVisitorArrival,
  getTodaysVisitors,
  getVisitorsByDate,
  getFrequentVisitorsByUser
} = require('../models/Visitor');
const { formatForDisplay, formatDateForDisplay } = require('../utils/timezone');

// Función auxiliar para formatear visitantes con fechas en zona horaria de Venezuela
function formatVisitorsWithTimezone(visitors) {
  return visitors.map(visitor => ({
    ...visitor,
    visit_date: visitor.visit_date ? formatDateForDisplay(visitor.visit_date) : null,
    arrival_datetime: visitor.arrival_datetime ? formatForDisplay(visitor.arrival_datetime) : null,
    created_at: visitor.created_at ? formatForDisplay(visitor.created_at) : null,
    log_visit_type: visitor.log_visit_type || null,
    vehicle_plate: visitor.vehicle_plate || null
  }));
}

// Crear un nuevo visitante único
const createUniqueVisitorController = async (req, res) => {
  try {
    const { wp_user_id, first_name, last_name, id_card, visit_date } = req.body;

    // Validar campos requeridos
    if (!wp_user_id || !first_name || !last_name || !id_card || !visit_date) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(visit_date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use AAAA-MM-DD' });
    }

    const visitorData = {
      wp_user_id,
      first_name,
      last_name,
      id_card,
      visit_date
    };

    const newVisitor = await createUniqueVisitor(visitorData);
    res.status(201).json(newVisitor);
  } catch (error) {
    console.error('Error al crear visitante único:', error);
    if (error.message.includes('Ya existe un visitante frecuente') ||
        error.message.includes('Ya existe un visitante único')) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};


// Crear un nuevo visitante frecuente
const createFrequentVisitorController = async (req, res) => {
  try {
    const { wp_user_id, first_name, last_name, id_card, frequent_visit_description, frequent_visit_other_description } = req.body;

    // Validar campos requeridos
    if (!wp_user_id || !first_name || !last_name || !id_card || !frequent_visit_description) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validar descripción de visita frecuente
    const validDescriptions = ['Familia', 'Transporte Escolar', 'Proveedores', 'Otros'];
    if (!validDescriptions.includes(frequent_visit_description)) {
      return res.status(400).json({ error: 'Descripción de visita frecuente inválida' });
    }

    // Validar descripción adicional si es "Otros"
    if (frequent_visit_description === 'Otros' && !frequent_visit_other_description) {
      return res.status(400).json({ error: 'Se requiere una descripción adicional cuando se selecciona "Otros"' });
    }

    const visitorData = {
      wp_user_id,
      first_name,
      last_name,
      id_card,
      frequent_visit_description,
      frequent_visit_other_description
    };

    const newVisitor = await createFrequentVisitor(visitorData);
    res.status(201).json(newVisitor);
  } catch (error) {
    console.error('Error al crear visitante frecuente:', error);
    if (error.message.includes('Ya existe un visitante frecuente')) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Obtener historial de visitantes para un usuario de WordPress
const getVisitorHistoryController = async (req, res) => {
  try {
    const { wp_user_id } = req.params;

    if (!wp_user_id) {
      return res.status(400).json({ error: 'Falta wp_user_id' });
    }

    const history = await getVisitorHistory(wp_user_id);
    const formattedHistory = formatVisitorsWithTimezone(history);
    res.status(200).json({ visitor_history: formattedHistory });
  } catch (error) {
    console.error('Error al obtener historial de visitantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Activar un visitante frecuente
const activateFrequentVisitorController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Falta ID del visitante' });
    }

    const result = await updateFrequentVisitorStatus(id, true);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Visitante frecuente no encontrado' });
    }

    res.status(200).json({ message: 'Visitante frecuente activado exitosamente' });
  } catch (error) {
    console.error('Error al activar visitante frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Desactivar un visitante frecuente
const deactivateFrequentVisitorController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Falta ID del visitante' });
    }

    const result = await updateFrequentVisitorStatus(id, false);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Visitante frecuente no encontrado' });
    }

    res.status(200).json({ message: 'Visitante frecuente desactivado exitosamente' });
  } catch (error) {
    console.error('Error al desactivar visitante frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Validar un visitante por cédula
const validateVisitorController = async (req, res) => {
  try {
    const { id_card } = req.params;
    
    if (!id_card) {
      return res.status(400).json({ error: 'Falta número de cédula' });
    }
    
    const visitor = await validateVisitor(id_card);
    if (!visitor) {
      return res.status(404).json({ 
        valid: false, 
        error: 'Visitante no encontrado o no válido para hoy' 
      });
    }
    
    res.status(200).json({ 
      valid: true, 
      visitor: visitor 
    });
  } catch (error) {
    console.error('Error al validar visitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Registrar llegada de visitante
const logVisitorArrivalController = async (req, res) => {
  try {
    const { visitor_id } = req.params;
    const { visit_type = 'pedestrian', vehicle_plate = null } = req.body;
    
    if (!visitor_id) {
      return res.status(400).json({ error: 'Falta ID del visitante' });
    }
    
    // Validar tipo de visita
    if (visit_type !== 'pedestrian' && visit_type !== 'vehicle') {
      return res.status(400).json({ error: 'Tipo de visita inválido. Use "pedestrian" o "vehicle"' });
    }
    
    // Validar placa si es vehículo
    if (visit_type === 'vehicle' && (!vehicle_plate || vehicle_plate.trim() === '')) {
      return res.status(400).json({ error: 'Se requiere placa del vehículo para visitas tipo vehicle' });
    }
    
    const result = await logVisitorArrival(visitor_id, visit_type, vehicle_plate);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Visitante no encontrado' });
    }
    
    res.status(201).json({ 
      message: 'Llegada de visitante registrada exitosamente',
      visit_type: visit_type,
      vehicle_plate: vehicle_plate
    });
  } catch (error) {
    console.error('Error al registrar llegada de visitante:', error);
    if (error.message.includes('Se requiere placa del vehículo')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

 // Obtener visitantes de hoy
async function getTodaysVisitorsController(req, res) {
  try {
    const visitors = await getTodaysVisitors();
    const formattedVisitors = formatVisitorsWithTimezone(visitors);
    res.status(200).json({ visitors: formattedVisitors });
  } catch (error) {
    console.error('Error al obtener visitantes de hoy:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener visitantes de una fecha específica
async function getVisitorsByDateController(req, res) {
  try {
    const { date } = req.params;
    
    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }
    
    const visitors = await getVisitorsByDate(date);
    const formattedVisitors = formatVisitorsWithTimezone(visitors);
    res.status(200).json({ visitors: formattedVisitors });
  } catch (error) {
    console.error('Error al obtener visitantes por fecha:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener historial de visitas filtrado por fecha
async function getVisitHistoryByDateController(req, res) {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Falta el parámetro date' });
  }
  try {
    const history = await getVisitHistoryByDate(date);
    res.status(200).json({ history: history });
  } catch (error) {
    console.error('Error al obtener historial de visitas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener visitantes frecuentes de un usuario específico
async function getFrequentVisitorsByUserController(req, res) {
  try {
    const { wp_user_id } = req.params;
    
    if (!wp_user_id) {
      return res.status(400).json({ error: 'Falta wp_user_id' });
    }
    
    const visitors = await getFrequentVisitorsByUser(wp_user_id);
    const formattedVisitors = formatVisitorsWithTimezone(visitors);
    res.status(200).json({ visitors: formattedVisitors });
  } catch (error) {
    console.error('Error al obtener visitantes frecuentes del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener lista de usuarios/propietarios
async function getUsersController(req, res) {
  try {
    const db = require('../config/database');
    const query = `
      SELECT u.ID, u.display_name, u.user_email 
      FROM wp_users u
      INNER JOIN wp_usermeta um ON u.ID = um.user_id
      WHERE u.user_status = 0 
        AND um.meta_key = 'wp_capabilities'
        AND um.meta_value LIKE '%subscriber%'
      ORDER BY u.display_name ASC
    `;
    
    const [rows] = await db.execute(query);
    res.status(200).json({ users: rows });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Generar reporte Excel de visitas para una fecha específica
async function generateExcelReportController(req, res) {
  try {
    const { date } = req.params;
    
    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }
    
    // Obtener visitantes de la fecha
    const visitors = await getVisitorsByDate(date);
    const formattedVisitors = formatVisitorsWithTimezone(visitors);
    
    // Crear archivo Excel
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Visitas');
    
    // Configurar headers para descarga
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-visitas-${date}.xlsx"`);
    
    // Configurar columnas
    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 25 },
      { header: 'Cédula', key: 'cedula', width: 15 },
      { header: 'Propietario', key: 'propietario', width: 25 },
      { header: 'Tipo', key: 'tipo', width: 12 },
      { header: 'Fecha de Visita', key: 'fecha_visita', width: 15 },
      { header: 'Tipo de Entrada', key: 'tipo_entrada', width: 15 },
      { header: 'Placa', key: 'placa', width: 12 },
      { header: 'Hora de Llegada', key: 'hora_llegada', width: 20 }
    ];
    
    // Estilizar encabezados
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2C3E50' }
    };
    worksheet.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    
    // Agregar datos
    formattedVisitors.forEach(visitor => {
      const visitDate = visitor.visit_date || 'Frecuente';
      const entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
      const vehiclePlate = visitor.vehicle_plate || '-';
      const arrivalTime = visitor.arrival_datetime || 'No registrada';
      
      worksheet.addRow({
        nombre: `${visitor.first_name} ${visitor.last_name}`,
        cedula: visitor.id_card,
        propietario: visitor.owner_name,
        tipo: visitor.visit_type === 'unique' ? 'Única' : 'Frecuente',
        fecha_visita: visitDate,
        tipo_entrada: entryType,
        placa: vehiclePlate,
        hora_llegada: arrivalTime
      });
    });
    
    // Agregar información del reporte en la parte superior
    worksheet.insertRow(1, ['Reporte de Visitas'], 'i');
    worksheet.insertRow(2, [`Fecha: ${date}`], 'i');
    worksheet.insertRow(3, [`Total de visitas: ${formattedVisitors.length}`], 'i');
    worksheet.insertRow(4, [`Generado el: ${new Date().toLocaleDateString('es-VE')} a las ${new Date().toLocaleTimeString('es-VE')}`], 'i');
    worksheet.insertRow(5, [''], 'i'); // Línea vacía
    
    // Estilizar información del reporte
    for (let i = 1; i <= 5; i++) {
      worksheet.getRow(i).font = { bold: true, size: 14 };
      worksheet.getRow(i).alignment = { horizontal: 'center' };
    }
    
    // Combinar celdas para el título
    worksheet.mergeCells('A1:H1');
    worksheet.mergeCells('A2:H2');
    worksheet.mergeCells('A3:H3');
    worksheet.mergeCells('A4:H4');
    worksheet.mergeCells('A5:H5');
    
    // Ajustar altura de filas
    worksheet.getRow(1).height = 25;
    worksheet.getRow(2).height = 20;
    worksheet.getRow(3).height = 20;
    worksheet.getRow(4).height = 20;
    worksheet.getRow(5).height = 10;
    
    // Estilizar todas las celdas de datos
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 5) { // Solo las filas de datos
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
        });
      }
    });
    
    // Escribir el archivo al response
    await workbook.xlsx.write(res);
    res.end();
    
  } catch (error) {
    console.error('Error al generar reporte Excel:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  createUniqueVisitorController,
  createFrequentVisitorController,
  getVisitorHistoryController,
  activateFrequentVisitorController,
  deactivateFrequentVisitorController,
  validateVisitorController,
  logVisitorArrivalController,
  getTodaysVisitorsController,
  getVisitorsByDateController,
  getFrequentVisitorsByUserController,
  getVisitHistoryByDateController,
  getUsersController,
  generateExcelReportController
};