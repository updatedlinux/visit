const db = require('../config/database');

// Crear un nuevo visitante único
async function createUniqueVisitor(visitorData) {
  const { wp_user_id, first_name, last_name, id_card, visit_date } = visitorData;
  
  try {
    // Verificar si ya existe un visitante frecuente con esta cédula
    const [frequentVisitor] = await db.execute(
      'SELECT id, active FROM condo360_visitors WHERE id_card = ? AND visit_type = ?',
      [id_card, 'frequent']
    );
    
    if (frequentVisitor.length > 0) {
      if (frequentVisitor[0].active) {
        throw new Error('Ya existe un visitante frecuente activo con esta cédula. No se puede crear un visitante único.');
      } else {
        throw new Error('Ya existe un visitante frecuente inactivo con esta cédula. Active el visitante frecuente existente en lugar de crear uno nuevo.');
      }
    }
    
    // Verificar si ya existe un visitante único con la misma cédula para la misma fecha
    const [existingVisitor] = await db.execute(
      'SELECT id FROM condo360_visitors WHERE id_card = ? AND visit_date = ? AND visit_type = ?',
      [id_card, visit_date, 'unique']
    );
    
    if (existingVisitor.length > 0) {
      throw new Error('Ya existe un visitante único con esta cédula para la fecha especificada.');
    }
    
    // Insertar el nuevo visitante único
    const [result] = await db.execute(
      `INSERT INTO condo360_visitors 
      (wp_user_id, first_name, last_name, id_card, visit_date, visit_type) 
      VALUES (?, ?, ?, ?, ?, 'unique')`,
      [wp_user_id, first_name, last_name, id_card, visit_date]
    );
    
    // Obtener el visitante recién creado con información del propietario
    const [rows] = await db.execute(
      `SELECT v.*, u.display_name as owner_name 
      FROM condo360_visitors v 
      JOIN wp_users u ON v.wp_user_id = u.ID 
      WHERE v.id = ?`,
      [result.insertId]
    );
    
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Crear un nuevo visitante frecuente
async function createFrequentVisitor(visitorData) {
  const { wp_user_id, first_name, last_name, id_card, frequent_visit_description, frequent_visit_other_description } = visitorData;
  
  try {
    // Verificar si ya existe un visitante frecuente con esta cédula
    const [existingVisitor] = await db.execute(
      'SELECT id, active FROM condo360_visitors WHERE id_card = ? AND visit_type = ?',
      [id_card, 'frequent']
    );
    
    if (existingVisitor.length > 0) {
      if (existingVisitor[0].active) {
        throw new Error('Ya existe un visitante frecuente activo con esta cédula.');
      } else {
        throw new Error('Ya existe un visitante frecuente inactivo con esta cédula. Active el visitante frecuente existente en lugar de crear uno nuevo.');
      }
    }
    
    // Verificar si ya existe un visitante único con la misma cédula
    const [uniqueVisitor] = await db.execute(
      'SELECT id FROM condo360_visitors WHERE id_card = ? AND visit_type = ?',
      [id_card, 'unique']
    );
    
    if (uniqueVisitor.length > 0) {
      throw new Error('Ya existe un visitante único con esta cédula. No se puede crear un visitante frecuente.');
    }
    
    // Insertar el nuevo visitante frecuente
    const [result] = await db.execute(
      `INSERT INTO condo360_visitors 
      (wp_user_id, first_name, last_name, id_card, visit_type, frequent_visit_description, frequent_visit_other_description, active) 
      VALUES (?, ?, ?, ?, 'frequent', ?, ?, 1)`,
      [wp_user_id, first_name, last_name, id_card, frequent_visit_description, frequent_visit_other_description || null]
    );
    
    // Obtener el visitante recién creado con información del propietario
    const [rows] = await db.execute(
      `SELECT v.*, u.display_name as owner_name 
      FROM condo360_visitors v 
      JOIN wp_users u ON v.wp_user_id = u.ID 
      WHERE v.id = ?`,
      [result.insertId]
    );
    
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Obtener historial de visitantes para un usuario de WordPress
async function getVisitorHistory(wp_user_id) {
  const query = `
    SELECT v.*, u.display_name as owner_name
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    WHERE v.wp_user_id = ?
    ORDER BY v.created_at DESC
  `;
  const [rows] = await db.execute(query, [wp_user_id]);
  return rows;
}

// Actualizar estado de visitante frecuente
async function updateFrequentVisitorStatus(id, active) {
  const query = `
    UPDATE condo360_visitors 
    SET active = ? 
    WHERE id = ? AND visit_type = 'frequent'
  `;
  const [result] = await db.execute(query, [active ? 1 : 0, id]);
  return result;
}

// Validar visitante por cédula para el día actual
async function validateVisitor(id_card) {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT v.*, u.display_name as owner_name, u.user_email as owner_email
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    WHERE v.id_card = ? AND (
      (v.visit_type = 'unique' AND v.visit_date = ?) OR
      (v.visit_type = 'frequent' AND v.active = 1)
    )
    LIMIT 1
  `;
  const [rows] = await db.execute(query, [id_card, today]);
  return rows.length > 0 ? rows[0] : null;
}

// Registrar llegada de visitante
async function logVisitorArrival(visitor_id) {
  const query = `
    INSERT INTO condo360_visitor_logs (visitor_id, arrival_time)
    VALUES (?, NOW())
  `;
  const [result] = await db.execute(query, [visitor_id]);
  return result;
}

// Obtener visitantes de hoy
async function getTodaysVisitors() {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT v.*, u.display_name as owner_name
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    WHERE v.visit_type = 'unique' AND v.visit_date = ?
    ORDER BY v.created_at DESC
  `;
  const [rows] = await db.execute(query, [today]);
  return rows;
}

// Exportar las funciones
module.exports = {
  createUniqueVisitor,
  createFrequentVisitor,
  getVisitorHistory,
  updateFrequentVisitorStatus,
  validateVisitor,
  logVisitorArrival,
  getTodaysVisitors
};