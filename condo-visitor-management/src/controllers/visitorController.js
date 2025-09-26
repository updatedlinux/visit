const {
  createUniqueVisitor,
  createFrequentVisitor,
  getVisitorHistory,
  updateFrequentVisitorStatus,
  validateVisitor,
  logVisitorArrival,
  getTodaysVisitors
} = require('../models/Visitor');

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

// Controlador para obtener visitantes de hoy
async function getTodaysVisitorsController(req, res) {
  try {
    const visitors = await getTodaysVisitors();
    res.json({ visitors });
  } catch (error) {
    console.error('Error al obtener visitantes de hoy:', error);
    res.status(500).json({ error: 'Error al obtener visitantes de hoy' });
  }
}

// Controlador para obtener historial de visitas filtrado por fecha
async function getVisitHistoryByDateController(req, res) {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Falta el parámetro date' });
  }

  // Opcional: validar formato de fecha
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use AAAA-MM-DD' });
  }

  try {
    const history = await getVisitorHistory(date);
    res.json({ history });
  } catch (error) {
    console.error('Error al obtener historial de visitas:', error);
    res.status(500).json({ error: 'Error al obtener historial de visitas' });
  }
}

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
    res.status(200).json({ visitor_history: history });
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
    
    if (!visitor_id) {
      return res.status(400).json({ error: 'Falta ID del visitante' });
    }
    
    const result = await logVisitorArrival(visitor_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Visitante no encontrado' });
    }
    
    res.status(201).json({ message: 'Llegada de visitante registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar llegada de visitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

 // Obtener visitantes de hoy
async function getTodaysVisitorsController(req, res) {
  try {
    const visitors = await getTodaysVisitors();
    res.status(200).json({ visitors: visitors });
  } catch (error) {
    console.error('Error al obtener visitantes de hoy:', error);
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

module.exports = {
  getTodaysVisitorsController,
  getVisitHistoryByDateController,
  // otros controladores existentes
};