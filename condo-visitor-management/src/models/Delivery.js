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
    
    // Insertar el nuevo delivery
    const [result] = await db.execute(
      `INSERT INTO condo360_deliverys
       (wp_user_id, name, company, delivery_date, created_at)
       VALUES (?, ?, ?, ?, ?)`,
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
      u.user_nicename as owner_nicename
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
  getAllDeliverys
};

