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

// Generar reporte PDF de visitas para una fecha específica
async function generatePDFReportController(req, res) {
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
    
    // Generar PDF
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 50 });
    
    // Configurar headers para descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-visitas-${date}.pdf"`);
    
    // Pipe del documento al response
    doc.pipe(res);
    
    // Agregar logo (centrado)
    const logoUrl = 'https://bonaventurecclub.com/wp-content/uploads/2025/09/cropped-1-1.png';
    const https = require('https');
    
    // Descargar logo
    https.get(logoUrl, (logoRes) => {
      let logoData = Buffer.alloc(0);
      logoRes.on('data', (chunk) => {
        logoData = Buffer.concat([logoData, chunk]);
      });
      logoRes.on('end', () => {
        // Agregar logo al PDF
        doc.image(logoData, {
          width: 281,
          height: 94,
          align: 'center'
        });
        
        // Espacio después del logo
        doc.moveDown(2);
        
        // Título del reporte
        doc.fontSize(20)
           .font('Helvetica-Bold')
           .fillColor('#2c3e50')
           .text('Reporte de Visitas', { align: 'center' });
        
        // Fecha del reporte
        doc.fontSize(14)
           .font('Helvetica')
           .fillColor('#7f8c8d')
           .text(`Fecha: ${date}`, { align: 'center' });
        
        doc.moveDown(1);
        
        // Información del reporte
        doc.fontSize(12)
           .fillColor('#34495e')
           .text(`Total de visitas: ${formattedVisitors.length}`, { align: 'center' });
        
        doc.moveDown(2);
        
        // Tabla de visitantes
        if (formattedVisitors.length > 0) {
          // Calcular anchos dinámicos basados en el contenido
          const maxWidths = calculateColumnWidths(formattedVisitors, doc);
          const colPositions = calculateColumnPositions(maxWidths);
          
          // Encabezados de la tabla
          const tableTop = doc.y;
          const itemHeight = 20;
          
          // Encabezados
          doc.fontSize(10)
             .font('Helvetica-Bold')
             .fillColor('#2c3e50');
          
          const headers = ['Nombre', 'Cédula', 'Propietario', 'Tipo', 'Fecha', 'Entrada', 'Placa', 'Llegada'];
          headers.forEach((header, i) => {
            doc.text(header, colPositions[i], tableTop, { width: maxWidths[i], align: 'left' });
          });
          
          // Línea separadora
          doc.moveTo(50, tableTop + itemHeight)
             .lineTo(colPositions[colPositions.length - 1] + maxWidths[maxWidths.length - 1], tableTop + itemHeight)
             .stroke();
          
          // Datos de visitantes
          doc.fontSize(9)
             .font('Helvetica')
             .fillColor('#2c3e50');
          
          formattedVisitors.forEach((visitor, index) => {
            const y = tableTop + (index + 1) * itemHeight + 5;
            
            const visitDate = visitor.visit_date || 'Frecuente';
            const entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
            const vehiclePlate = visitor.vehicle_plate || '-';
            const arrivalTime = visitor.arrival_datetime || 'No registrada';
            
            const rowData = [
              `${visitor.first_name} ${visitor.last_name}`,
              visitor.id_card,
              visitor.owner_name,
              visitor.visit_type === 'unique' ? 'Única' : 'Frecuente',
              visitDate,
              entryType,
              vehiclePlate,
              arrivalTime
            ];
            
            rowData.forEach((data, i) => {
              // Ajustar texto si es muy largo
              const text = truncateText(data, maxWidths[i], doc);
              doc.text(text, colPositions[i], y, { width: maxWidths[i], align: 'left' });
            });
            
            // Verificar si necesitamos nueva página
            if (y + itemHeight > doc.page.height - 100) {
              doc.addPage();
            }
          });
        } else {
          doc.fontSize(14)
             .fillColor('#7f8c8d')
             .text('No hay visitas registradas para esta fecha', { align: 'center' });
        }
        
        // Pie de página
        doc.moveDown(3);
        doc.fontSize(10)
           .fillColor('#95a5a6')
           .text(`Reporte generado el ${new Date().toLocaleDateString('es-VE')} a las ${new Date().toLocaleTimeString('es-VE')}`, { align: 'center' });
        
        // Finalizar documento
        doc.end();
      });
    }).on('error', (err) => {
      console.error('Error al descargar logo:', err);
      // Continuar sin logo si hay error
      generatePDFWithoutLogo();
    });
    
    function generatePDFWithoutLogo() {
      // Título del reporte
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .fillColor('#2c3e50')
         .text('Reporte de Visitas', { align: 'center' });
      
      // Fecha del reporte
      doc.fontSize(14)
         .font('Helvetica')
         .fillColor('#7f8c8d')
         .text(`Fecha: ${date}`, { align: 'center' });
      
      doc.moveDown(1);
      
      // Información del reporte
      doc.fontSize(12)
         .fillColor('#34495e')
         .text(`Total de visitas: ${formattedVisitors.length}`, { align: 'center' });
      
      doc.moveDown(2);
      
      // Tabla de visitantes
      if (formattedVisitors.length > 0) {
        // Calcular anchos dinámicos basados en el contenido
        const maxWidths = calculateColumnWidths(formattedVisitors, doc);
        const colPositions = calculateColumnPositions(maxWidths);
        
        // Encabezados de la tabla
        const tableTop = doc.y;
        const itemHeight = 20;
        
        // Encabezados
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .fillColor('#2c3e50');
        
        const headers = ['Nombre', 'Cédula', 'Propietario', 'Tipo', 'Fecha', 'Entrada', 'Placa', 'Llegada'];
        headers.forEach((header, i) => {
          doc.text(header, colPositions[i], tableTop, { width: maxWidths[i], align: 'left' });
        });
        
        // Línea separadora
        doc.moveTo(50, tableTop + itemHeight)
           .lineTo(colPositions[colPositions.length - 1] + maxWidths[maxWidths.length - 1], tableTop + itemHeight)
           .stroke();
        
        // Datos de visitantes
        doc.fontSize(9)
           .font('Helvetica')
           .fillColor('#2c3e50');
        
        formattedVisitors.forEach((visitor, index) => {
          const y = tableTop + (index + 1) * itemHeight + 5;
          
          const visitDate = visitor.visit_date || 'Frecuente';
          const entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
          const vehiclePlate = visitor.vehicle_plate || '-';
          const arrivalTime = visitor.arrival_datetime || 'No registrada';
          
          const rowData = [
            `${visitor.first_name} ${visitor.last_name}`,
            visitor.id_card,
            visitor.owner_name,
            visitor.visit_type === 'unique' ? 'Única' : 'Frecuente',
            visitDate,
            entryType,
            vehiclePlate,
            arrivalTime
          ];
          
          rowData.forEach((data, i) => {
            // Ajustar texto si es muy largo
            const text = truncateText(data, maxWidths[i], doc);
            doc.text(text, colPositions[i], y, { width: maxWidths[i], align: 'left' });
          });
          
          // Verificar si necesitamos nueva página
          if (y + itemHeight > doc.page.height - 100) {
            doc.addPage();
          }
        });
      } else {
        doc.fontSize(14)
           .fillColor('#7f8c8d')
           .text('No hay visitas registradas para esta fecha', { align: 'center' });
      }
      
      // Pie de página
      doc.moveDown(3);
      doc.fontSize(10)
         .fillColor('#95a5a6')
         .text(`Reporte generado el ${new Date().toLocaleDateString('es-VE')} a las ${new Date().toLocaleTimeString('es-VE')}`, { align: 'center' });
      
      // Finalizar documento
      doc.end();
    }
    
  } catch (error) {
    console.error('Error al generar reporte PDF:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Función auxiliar para calcular anchos de columna dinámicos
function calculateColumnWidths(visitors, doc) {
  const headers = ['Nombre', 'Cédula', 'Propietario', 'Tipo', 'Fecha', 'Entrada', 'Placa', 'Llegada'];
  const minWidths = [80, 60, 80, 50, 60, 60, 60, 120]; // Anchos mínimos
  const maxWidths = [120, 80, 100, 60, 80, 80, 80, 180]; // Anchos máximos
  
  // Calcular ancho máximo para cada columna
  const calculatedWidths = headers.map((header, i) => {
    let maxWidth = doc.widthOfString(header, { fontSize: 10 });
    
    visitors.forEach(visitor => {
      const visitDate = visitor.visit_date || 'Frecuente';
      const entryType = visitor.log_visit_type ? (visitor.log_visit_type === 'vehicle' ? 'Vehículo' : 'Peatonal') : 'No registrada';
      const vehiclePlate = visitor.vehicle_plate || '-';
      const arrivalTime = visitor.arrival_datetime || 'No registrada';
      
      let cellValue;
      switch(i) {
        case 0: cellValue = `${visitor.first_name} ${visitor.last_name}`; break;
        case 1: cellValue = visitor.id_card; break;
        case 2: cellValue = visitor.owner_name; break;
        case 3: cellValue = visitor.visit_type === 'unique' ? 'Única' : 'Frecuente'; break;
        case 4: cellValue = visitDate; break;
        case 5: cellValue = entryType; break;
        case 6: cellValue = vehiclePlate; break;
        case 7: cellValue = arrivalTime; break;
      }
      
      const cellWidth = doc.widthOfString(cellValue, { fontSize: 9 });
      maxWidth = Math.max(maxWidth, cellWidth);
    });
    
    // Aplicar límites mínimos y máximos
    return Math.max(minWidths[i], Math.min(maxWidths[i], maxWidth + 10));
  });
  
  return calculatedWidths;
}

// Función auxiliar para calcular posiciones de columna
function calculateColumnPositions(widths) {
  const positions = [50]; // Posición inicial
  let currentPos = 50;
  
  for (let i = 0; i < widths.length - 1; i++) {
    currentPos += widths[i] + 10; // 10px de separación entre columnas
    positions.push(currentPos);
  }
  
  return positions;
}

// Función auxiliar para truncar texto si es muy largo
function truncateText(text, maxWidth, doc) {
  const fontSize = doc.fontSize || 9;
  const textWidth = doc.widthOfString(text, { fontSize });
  
  if (textWidth <= maxWidth) {
    return text;
  }
  
  // Truncar texto agregando "..."
  let truncated = text;
  while (doc.widthOfString(truncated + '...', { fontSize }) > maxWidth && truncated.length > 0) {
    truncated = truncated.slice(0, -1);
  }
  
  return truncated + '...';
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
  generatePDFReportController
};