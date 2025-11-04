const {
  createDelivery,
  getDeliverysByUser,
  searchDeliverysByOwner,
  getAllDeliverys,
  logDeliveryArrival,
  getDeliveryLogs,
  getDeliverysByDate
} = require('../models/Delivery');
const moment = require('moment-timezone');

const VENEZUELA_TIMEZONE = 'America/Caracas';

// Formatear deliverys con timezone
function formatDeliverysWithTimezone(deliverys) {
  return deliverys.map(delivery => {
    let arrivalDateTimeFormatted = null;
    if (delivery.arrival_datetime || delivery.last_arrival_datetime) {
      const arrivalTime = delivery.arrival_datetime || delivery.last_arrival_datetime;
      arrivalDateTimeFormatted = moment.tz(arrivalTime, VENEZUELA_TIMEZONE).format('YYYY-MM-DD hh:mm:ss A');
    }
    
    return {
      ...delivery,
      delivery_date: delivery.delivery_date ? moment(delivery.delivery_date).format('YYYY-MM-DD') : null,
      created_at: delivery.created_at ? moment.tz(delivery.created_at, VENEZUELA_TIMEZONE).format('YYYY-MM-DD hh:mm:ss A') : null,
      arrival_datetime: arrivalDateTimeFormatted,
      status: delivery.status || 'announced',
      status_text: delivery.status === 'announced' ? 'Anunciado' : 'Llegada Registrada',
      arrival_count: delivery.arrival_count || 0
    };
  });
}

// Crear un nuevo delivery
const createDeliveryController = async (req, res) => {
  try {
    const { wp_user_id, name, company, delivery_date } = req.body;

    // Validar campos requeridos
    if (!wp_user_id || !name || !company || !delivery_date) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(delivery_date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use AAAA-MM-DD' });
    }

    const deliveryData = {
      wp_user_id,
      name,
      company,
      delivery_date
    };

    const newDelivery = await createDelivery(deliveryData);
    const formattedDelivery = formatDeliverysWithTimezone([newDelivery])[0];
    
    res.status(201).json(formattedDelivery);
  } catch (error) {
    console.error('Error al crear delivery:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener deliverys de un usuario específico
const getDeliverysByUserController = async (req, res) => {
  try {
    const { wp_user_id } = req.params;

    if (!wp_user_id) {
      return res.status(400).json({ error: 'ID de usuario requerido' });
    }

    const deliverys = await getDeliverysByUser(wp_user_id);
    const formattedDeliverys = formatDeliverysWithTimezone(deliverys);

    res.json({ deliverys: formattedDeliverys });
  } catch (error) {
    console.error('Error al obtener deliverys:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Buscar deliverys por nombre o email del propietario
const searchDeliverysByOwnerController = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === '') {
      return res.status(400).json({ error: 'Término de búsqueda requerido' });
    }

    const deliverys = await searchDeliverysByOwner(search.trim());
    const formattedDeliverys = formatDeliverysWithTimezone(deliverys);

    res.json({ deliverys: formattedDeliverys });
  } catch (error) {
    console.error('Error al buscar deliverys:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los deliverys (para administración)
const getAllDeliverysController = async (req, res) => {
  try {
    const deliverys = await getAllDeliverys();
    const formattedDeliverys = formatDeliverysWithTimezone(deliverys);

    res.json({ deliverys: formattedDeliverys });
  } catch (error) {
    console.error('Error al obtener todos los deliverys:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Registrar llegada de un delivery
const logDeliveryArrivalController = async (req, res) => {
  try {
    const { delivery_id } = req.params;

    if (!delivery_id) {
      return res.status(400).json({ error: 'ID de delivery requerido' });
    }

    await logDeliveryArrival(delivery_id);
    
    res.json({ 
      message: 'Llegada de delivery registrada exitosamente',
      delivery_id: delivery_id
    });
  } catch (error) {
    console.error('Error al registrar llegada de delivery:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener logs de llegada de un delivery
const getDeliveryLogsController = async (req, res) => {
  try {
    const { delivery_id } = req.params;

    if (!delivery_id) {
      return res.status(400).json({ error: 'ID de delivery requerido' });
    }

    const logs = await getDeliveryLogs(delivery_id);
    const formattedLogs = logs.map(log => ({
      ...log,
      arrival_datetime: log.arrival_datetime ? moment.tz(log.arrival_datetime, VENEZUELA_TIMEZONE).format('YYYY-MM-DD hh:mm:ss A') : null
    }));

    res.json({ logs: formattedLogs });
  } catch (error) {
    console.error('Error al obtener logs de delivery:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener historial de deliverys filtrado por fecha
const getDeliverysHistoryByDateController = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Falta el parámetro date' });
    }

    const deliverys = await getDeliverysByDate(date);
    const formattedDeliverys = formatDeliverysWithTimezone(deliverys);

    res.json({ deliverys: formattedDeliverys });
  } catch (error) {
    console.error('Error al obtener historial de deliverys:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Generar reporte Excel de deliverys para una fecha específica
const generateDeliveryExcelReportController = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }
    
    // Obtener deliverys de la fecha
    const deliverys = await getDeliverysByDate(date);
    const formattedDeliverys = formatDeliverysWithTimezone(deliverys);
    
    // Crear archivo Excel
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Deliverys');
    
    // Configurar headers para descarga
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-deliverys-${date}.xlsx"`);
    
    // Configurar columnas
    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 25 },
      { header: 'Empresa', key: 'empresa', width: 20 },
      { header: 'Fecha de Llegada', key: 'fecha_llegada', width: 15 },
      { header: 'Propietario', key: 'propietario', width: 25 },
      { header: 'Email del Propietario', key: 'email', width: 25 },
      { header: 'Estado', key: 'estado', width: 15 },
      { header: 'Hora de Llegada', key: 'hora_llegada', width: 20 },
      { header: 'Total de Llegadas', key: 'total_llegadas', width: 15 }
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
    formattedDeliverys.forEach(delivery => {
      const arrivalTime = delivery.arrival_datetime || delivery.last_arrival_datetime;
      let arrivalTimeFormatted = '-';
      if (arrivalTime) {
        arrivalTimeFormatted = moment.tz(arrivalTime, VENEZUELA_TIMEZONE).format('YYYY-MM-DD hh:mm:ss A');
      }
      
      worksheet.addRow({
        nombre: delivery.name || '-',
        empresa: delivery.company || '-',
        fecha_llegada: delivery.delivery_date || '-',
        propietario: delivery.owner_name || delivery.owner_nicename || '-',
        email: delivery.owner_email || '-',
        estado: delivery.status_text || 'Anunciado',
        hora_llegada: arrivalTimeFormatted,
        total_llegadas: delivery.arrival_count || 0
      });
    });
    
    // Agregar información del reporte en la parte superior
    worksheet.insertRow(1, ['Reporte de Deliverys'], 'i');
    worksheet.insertRow(2, [`Fecha: ${date}`], 'i');
    worksheet.insertRow(3, [`Total de deliverys: ${formattedDeliverys.length}`], 'i');
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
    console.error('Error al generar reporte Excel de deliverys:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createDeliveryController,
  getDeliverysByUserController,
  searchDeliverysByOwnerController,
  getAllDeliverysController,
  logDeliveryArrivalController,
  getDeliveryLogsController,
  getDeliverysHistoryByDateController,
  generateDeliveryExcelReportController
};

