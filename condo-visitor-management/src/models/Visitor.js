const db = require('../config/database');
const { getCurrentVenezuelaDate, getCurrentVenezuelaDateForStorage } = require('../utils/timezone');
const moment = require('moment-timezone');

const VENEZUELA_TIMEZONE = 'America/Caracas';

// Crear un nuevo visitante único sin restricciones de duplicidad
async function createUniqueVisitor(visitorData) {
  const { wp_user_id, first_name, last_name, id_card, visit_date } = visitorData;

  try {
    // Insertar un nuevo visitante único sin verificar duplicados
    const [result] = await db.execute(
      `INSERT INTO condo360_visitors
       (wp_user_id, first_name, last_name, id_card, visit_date, visit_type)
       VALUES (?, ?, ?, ?, ?, 'unique')`,
      [wp_user_id, first_name, last_name, id_card, visit_date]
    );

    // Obtener el visitante recién creado
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

// Crear un nuevo visitante frecuente sin restricciones de duplicidad
async function createFrequentVisitor(visitorData) {
  const { wp_user_id, first_name, last_name, id_card, frequent_visit_description, frequent_visit_other_description } = visitorData;

  try {
    // Insertar el nuevo visitante frecuente sin verificar duplicados
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
function getVisitorHistory(wp_user_id) {
  const query = `
    SELECT v.*, u.display_name as owner_name
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    WHERE v.wp_user_id = ?
    ORDER BY v.created_at DESC
  `;
  return db.execute(query, [wp_user_id]).then(([rows]) => rows);
}

// Actualizar estado de visitante frecuente
function updateFrequentVisitorStatus(id, active) {
  const query = `
    UPDATE condo360_visitors
    SET active = ?
    WHERE id = ? AND visit_type = 'frequent'
  `;
  return db.execute(query, [active ? 1 : 0, id]);
}

// Validar visitante por cédula para el día actual
function validateVisitor(id_card) {
  const today = getCurrentVenezuelaDate();
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
  return db.execute(query, [id_card, today]).then(([rows]) => rows.length > 0 ? rows[0] : null);
}

// Registrar llegada de visitante
function logVisitorArrival(visitor_id, visit_type = 'pedestrian', vehicle_plate = null) {
  const venezuelaTime = getCurrentVenezuelaDateForStorage();
  
  // Validar que si es vehículo, debe tener placa
  if (visit_type === 'vehicle' && (!vehicle_plate || vehicle_plate.trim() === '')) {
    throw new Error('Se requiere placa del vehículo para visitas tipo vehicle');
  }
  
  // Si es peatonal, asegurar que no tenga placa
  if (visit_type === 'pedestrian') {
    vehicle_plate = null;
  }
  
  const query = `
    INSERT INTO condo360_visit_logs (visitor_id, arrival_datetime, visit_type, vehicle_plate)
    VALUES (?, ?, ?, ?)
  `;
  return db.execute(query, [visitor_id, venezuelaTime, visit_type, vehicle_plate]);
}

// Obtener visitantes de hoy (solo visitas únicas)
function getTodaysVisitors() {
  const today = getCurrentVenezuelaDate();
  const startOfDay = moment().tz(VENEZUELA_TIMEZONE).startOf('day').toDate();
  const endOfDay = moment().tz(VENEZUELA_TIMEZONE).endOf('day').toDate();
  
  const query = `
    SELECT 
      v.*, 
      u.display_name as owner_name,
      vl.arrival_datetime,
      vl.id as log_id,
      vl.visit_type as log_visit_type,
      vl.vehicle_plate
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    LEFT JOIN condo360_visit_logs vl ON v.id = vl.visitor_id 
      AND vl.arrival_datetime >= ? AND vl.arrival_datetime <= ?
    WHERE v.visit_type = 'unique' AND v.visit_date = ?
    ORDER BY v.created_at DESC
  `;
  return db.execute(query, [startOfDay, endOfDay, today]).then(([rows]) => rows);
}

// Obtener visitantes de una fecha específica
function getVisitorsByDate(date) {
  // Convertir la fecha a rango de zona horaria de Venezuela
  const startOfDay = moment.tz(date, VENEZUELA_TIMEZONE).startOf('day').toDate();
  const endOfDay = moment.tz(date, VENEZUELA_TIMEZONE).endOf('day').toDate();
  
  const query = `
    SELECT 
      v.*, 
      u.display_name as owner_name,
      vl.arrival_datetime,
      vl.id as log_id,
      vl.visit_type as log_visit_type,
      vl.vehicle_plate
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    LEFT JOIN condo360_visit_logs vl ON v.id = vl.visitor_id 
      AND vl.arrival_datetime >= ? AND vl.arrival_datetime <= ?
    WHERE (
      (v.visit_type = 'unique' AND v.visit_date = ?) OR
      (v.visit_type = 'frequent' AND v.active = 1)
    )
    ORDER BY v.created_at DESC
  `;
  return db.execute(query, [startOfDay, endOfDay, date]).then(([rows]) => rows);
}

// Obtener visitantes frecuentes de un usuario específico
function getFrequentVisitorsByUser(wp_user_id) {
  const query = `
    SELECT 
      v.*, 
      u.display_name as owner_name
    FROM condo360_visitors v
    JOIN wp_users u ON v.wp_user_id = u.ID
    WHERE v.wp_user_id = ? AND v.visit_type = 'frequent'
    ORDER BY v.created_at DESC
  `;
  return db.execute(query, [wp_user_id]).then(([rows]) => rows);
}

module.exports = {
  createUniqueVisitor,
  createFrequentVisitor,
  getVisitorHistory,
  updateFrequentVisitorStatus,
  validateVisitor,
  logVisitorArrival,
  getTodaysVisitors,
  getVisitorsByDate,
  getFrequentVisitorsByUser
};