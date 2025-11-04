const {
  createDelivery,
  getDeliverysByUser,
  searchDeliverysByOwner,
  getAllDeliverys,
  logDeliveryArrival,
  getDeliveryLogs
} = require('../models/Delivery');
const moment = require('moment-timezone');

const VENEZUELA_TIMEZONE = 'America/Caracas';

// Formatear deliverys con timezone
function formatDeliverysWithTimezone(deliverys) {
  return deliverys.map(delivery => ({
    ...delivery,
    delivery_date: delivery.delivery_date ? moment(delivery.delivery_date).format('YYYY-MM-DD') : null,
    created_at: delivery.created_at ? moment.tz(delivery.created_at, VENEZUELA_TIMEZONE).format('YYYY-MM-DD HH:mm:ss') : null,
    status: delivery.status || 'announced',
    status_text: delivery.status === 'announced' ? 'Anunciado' : 'Llegada Registrada',
    arrival_count: delivery.arrival_count || 0
  }));
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
      arrival_datetime: log.arrival_datetime ? moment.tz(log.arrival_datetime, VENEZUELA_TIMEZONE).format('YYYY-MM-DD HH:mm:ss') : null
    }));

    res.json({ logs: formattedLogs });
  } catch (error) {
    console.error('Error al obtener logs de delivery:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createDeliveryController,
  getDeliverysByUserController,
  searchDeliverysByOwnerController,
  getAllDeliverysController,
  logDeliveryArrivalController,
  getDeliveryLogsController
};

