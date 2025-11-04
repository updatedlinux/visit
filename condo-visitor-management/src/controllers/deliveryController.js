const {
  createDelivery,
  getDeliverysByUser,
  searchDeliverysByOwner,
  getAllDeliverys
} = require('../models/Delivery');
const moment = require('moment-timezone');

const VENEZUELA_TIMEZONE = 'America/Caracas';

// Formatear deliverys con timezone
function formatDeliverysWithTimezone(deliverys) {
  return deliverys.map(delivery => ({
    ...delivery,
    delivery_date: delivery.delivery_date ? moment(delivery.delivery_date).format('YYYY-MM-DD') : null,
    created_at: delivery.created_at ? moment.tz(delivery.created_at, VENEZUELA_TIMEZONE).format('YYYY-MM-DD HH:mm:ss') : null
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

module.exports = {
  createDeliveryController,
  getDeliverysByUserController,
  searchDeliverysByOwnerController,
  getAllDeliverysController
};

