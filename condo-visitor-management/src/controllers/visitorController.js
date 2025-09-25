const Visitor = require('../models/Visitor');

// Crear un nuevo visitante único
async function createUniqueVisitor(req, res) {
  try {
    const { wp_user_id, first_name, last_name, id_card, visit_date } = req.body;
    
    // Validar campos requeridos
    if (!wp_user_id || !first_name || !last_name || !id_card || !visit_date) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: wp_user_id, first_name, last_name, id_card, visit_date'
      });
    }
    
    // Verificar si el visitante ya existe para esta fecha
    const exists = await Visitor.uniqueVisitorExists(id_card, visit_date);
    if (exists) {
      return res.status(409).json({
        error: 'Ya existe un visitante único con esta cédula para la fecha especificada'
      });
    }
    
    // Crear el visitante
    const visitorId = await Visitor.createUniqueVisitor({
      wp_user_id, first_name, last_name, id_card, visit_date
    });
    
    res.status(201).json({
      message: 'Visitante único creado exitosamente',
      visitor_id: visitorId
    });
  } catch (error) {
    console.error('Error al crear visitante único:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Crear un nuevo visitante frecuente
async function createFrequentVisitor(req, res) {
  try {
    const { wp_user_id, first_name, last_name, id_card, 
            frequent_visit_description, frequent_visit_other_description } = req.body;
    
    // Validar campos requeridos
    if (!wp_user_id || !first_name || !last_name || !id_card || !frequent_visit_description) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: wp_user_id, first_name, last_name, id_card, frequent_visit_description'
      });
    }
    
    // Validar valores de frequent_visit_description
    const validDescriptions = ['Familia', 'Transporte Escolar', 'Proveedores', 'Otros'];
    if (!validDescriptions.includes(frequent_visit_description)) {
      return res.status(400).json({
        error: 'Descripción de visita frecuente inválida. Debe ser una de: ' + validDescriptions.join(', ')
      });
    }
    
    // Si se selecciona "Otros", se requiere frequent_visit_other_description
    if (frequent_visit_description === 'Otros' && !frequent_visit_other_description) {
      return res.status(400).json({
        error: 'Se requiere frequent_visit_other_description cuando se selecciona "Otros"'
      });
    }
    
    // Verificar si ya existe un visitante frecuente activo con esta cédula
    const exists = await Visitor.activeFrequentVisitorExists(id_card);
    if (exists) {
      return res.status(409).json({
        error: 'Ya existe un visitante frecuente activo con esta cédula'
      });
    }
    
    // Crear el visitante frecuente
    const visitorId = await Visitor.createFrequentVisitor({
      wp_user_id, first_name, last_name, id_card, 
      frequent_visit_description, frequent_visit_other_description
    });
    
    res.status(201).json({
      message: 'Visitante frecuente creado exitosamente',
      visitor_id: visitorId
    });
  } catch (error) {
    console.error('Error al crear visitante frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener historial de visitantes para un usuario
async function getVisitorHistory(req, res) {
  try {
    const { wp_user_id } = req.params;
    
    if (!wp_user_id) {
      return res.status(400).json({ error: 'Se requiere wp_user_id' });
    }
    
    const history = await Visitor.getVisitorHistory(wp_user_id);
    
    res.json({
      visitor_history: history
    });
  } catch (error) {
    console.error('Error al obtener historial de visitantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Activar visitante frecuente
async function activateFrequentVisitor(req, res) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Se requiere ID de visitante' });
    }
    
    const success = await Visitor.activateFrequentVisitor(id);
    
    if (success) {
      res.json({ message: 'Visitante frecuente activado exitosamente' });
    } else {
      res.status(404).json({ error: 'Visitante frecuente no encontrado' });
    }
  } catch (error) {
    console.error('Error al activar visitante frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Desactivar visitante frecuente
async function deactivateFrequentVisitor(req, res) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Se requiere ID de visitante' });
    }
    
    const success = await Visitor.deactivateFrequentVisitor(id);
    
    if (success) {
      res.json({ message: 'Visitante frecuente desactivado exitosamente' });
    } else {
      res.status(404).json({ error: 'Visitante frecuente no encontrado' });
    }
  } catch (error) {
    console.error('Error al desactivar visitante frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Validar visitante por cédula
async function validateVisitor(req, res) {
  try {
    const { id_card } = req.params;
    
    if (!id_card) {
      return res.status(400).json({ error: 'Se requiere número de cédula' });
    }
    
    const visitor = await Visitor.validateVisitor(id_card);
    
    if (visitor) {
      res.json({
        valid: true,
        visitor: visitor
      });
    } else {
      res.status(404).json({
        valid: false,
        error: 'Visitante no encontrado o no válido para hoy'
      });
    }
  } catch (error) {
    console.error('Error al validar visitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Registrar llegada de visitante
async function logVisitorArrival(req, res) {
  try {
    const { visitor_id } = req.params;
    
    if (!visitor_id) {
      return res.status(400).json({ error: 'Se requiere ID de visitante' });
    }
    
    // Verificar que el visitante existe y es válido
    // Esto normalmente involucraría validación adicional
    
    const logId = await Visitor.logVisitorArrival(visitor_id);
    
    res.status(201).json({
      message: 'Llegada de visitante registrada exitosamente',
      log_id: logId
    });
  } catch (error) {
    console.error('Error al registrar llegada de visitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener visitantes de hoy (para panel de seguridad)
async function getTodaysVisitors(req, res) {
  try {
    const visitors = await Visitor.getTodaysUniqueVisitors();
    
    res.json({
      date: new Date().toISOString().split('T')[0],
      visitors: visitors
    });
  } catch (error) {
    console.error('Error al obtener visitantes de hoy:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  createUniqueVisitor,
  createFrequentVisitor,
  getVisitorHistory,
  activateFrequentVisitor,
  deactivateFrequentVisitor,
  validateVisitor,
  logVisitorArrival,
  getTodaysVisitors
};