const db = require('../config/database');
const { getCurrentVenezuelaDate, getCurrentVenezuelaDateForStorage } = require('../utils/timezone');
const moment = require('moment-timezone');

const VENEZUELA_TIMEZONE = 'America/Caracas';

// Crear un nuevo delivery
async function createDelivery(deliveryData) {
  const { wp_user_id, name, company, delivery_date } = deliveryData;

  try {
    // Usar la fecha/hora actual de Venezuela para created_at
    const venezuelaTime = getCurrentVenezuelaDateForStorage();
    
    // Insertar el nuevo delivery con status 'announced' por defecto
    const [result] = await db.execute(
      `INSERT INTO condo360_deliverys
       (wp_user_id, name, company, delivery_date, status, created_at)
       VALUES (?, ?, ?, ?, 'announced', ?)`,
      [wp_user_id, name, company, delivery_date, venezuelaTime]
    );

    // Obtener el delivery recién creado con información del propietario
    const [rows] = await db.execute(
      `SELECT d.*, u.display_name as owner_name, u.user_email as owner_email, u.user_nicename as owner_nicename
       FROM condo360_deliverys d
       JOIN wp_users u ON d.wp_user_id = u.ID
       WHERE d.id = ?`,
      [result.insertId]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Obtener deliverys de un usuario específico
function getDeliverysByUser(wp_user_id) {
  const query = `
    SELECT 
      d.*, 
      u.display_name as owner_name,
      u.user_email as owner_email,
      u.user_nicename as owner_nicename
    FROM condo360_deliverys d
    JOIN wp_users u ON d.wp_user_id = u.ID
    WHERE d.wp_user_id = ?
    ORDER BY d.created_at DESC
  `;
  return db.execute(query, [wp_user_id]).then(([rows]) => rows);
}

// Buscar deliverys por nombre o email del propietario
function searchDeliverysByOwner(searchTerm) {
  const searchPattern = `%${searchTerm}%`;
  const query = `
    SELECT 
      d.*, 
      u.display_name as owner_name,
      u.user_email as owner_email,
      u.user_nicename as owner_nicename,
      (SELECT COUNT(*) FROM condo360_delivery_logs dl WHERE dl.delivery_id = d.id) as arrival_count
    FROM condo360_deliverys d
    JOIN wp_users u ON d.wp_user_id = u.ID
    WHERE 
      u.display_name LIKE ? OR
      u.user_email LIKE ? OR
      u.user_nicename LIKE ?
    ORDER BY d.created_at DESC
  `;
  return db.execute(query, [searchPattern, searchPattern, searchPattern]).then(([rows]) => rows);
}

// Registrar llegada de un delivery
function logDeliveryArrival(delivery_id) {
  const venezuelaTime = getCurrentVenezuelaDateForStorage();
  
  const query = `
    INSERT INTO condo360_delivery_logs (delivery_id, arrival_datetime)
    VALUES (?, ?)
  `;
  return db.execute(query, [delivery_id, venezuelaTime]).then(() => {
    // Actualizar status del delivery a 'arrival_registered'
    return db.execute(
      `UPDATE condo360_deliverys SET status = 'arrival_registered' WHERE id = ?`,
      [delivery_id]
    );
  });
}

// Obtener logs de llegada de un delivery
function getDeliveryLogs(delivery_id) {
  const query = `
    SELECT * FROM condo360_delivery_logs
    WHERE delivery_id = ?
    ORDER BY arrival_datetime DESC
  `;
  return db.execute(query, [delivery_id]).then(([rows]) => rows);
}

// Obtener deliverys de una fecha específica (solo los que tienen llegadas registradas)
function getDeliverysByDate(date) {
  // Convertir la fecha a rango de zona horaria de Venezuela
  const startOfDay = moment.tz(date, VENEZUELA_TIMEZONE).startOf('day').toDate();
  const endOfDay = moment.tz(date, VENEZUELA_TIMEZONE).endOf('day').toDate();
  
  const query = `
    SELECT 
      d.*, 
      u.display_name as owner_name,
      u.user_email as owner_email,
      u.user_nicename as owner_nicename,
      MAX(dl.arrival_datetime) as last_arrival_datetime,
      (SELECT COUNT(*) FROM condo360_delivery_logs dl2 
       WHERE dl2.delivery_id = d.id 
       AND dl2.arrival_datetime >= ? AND dl2.arrival_datetime <= ?) as arrival_count
    FROM condo360_deliverys d
    JOIN wp_users u ON d.wp_user_id = u.ID
    INNER JOIN condo360_delivery_logs dl ON d.id = dl.delivery_id 
      AND dl.arrival_datetime >= ? AND dl.arrival_datetime <= ?
    GROUP BY d.id
    ORDER BY last_arrival_datetime DESC
  `;
  return db.execute(query, [startOfDay, endOfDay, startOfDay, endOfDay]).then(([rows]) => rows);
}

// Obtener todos los deliverys (para administración)
function getAllDeliverys() {
  const query = `
    SELECT 
      d.*, 
      u.display_name as owner_name,
      u.user_email as owner_email,
      u.user_nicename as owner_nicename
    FROM condo360_deliverys d
    JOIN wp_users u ON d.wp_user_id = u.ID
    ORDER BY d.created_at DESC
  `;
  return db.execute(query).then(([rows]) => rows);
}

module.exports = {
  createDelivery,
  getDeliverysByUser,
  searchDeliverysByOwner,
  getAllDeliverys,
  logDeliveryArrival,
  getDeliveryLogs,
  getDeliverysByDate
};

