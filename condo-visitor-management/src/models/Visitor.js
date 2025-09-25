const db = require('../config/database');

class Visitor {
  // Crear un nuevo visitante único
  static async createUniqueVisitor(visitorData) {
    const { wp_user_id, first_name, last_name, id_card, visit_date } = visitorData;
    
    const query = `
      INSERT INTO condo360_visitors 
      (wp_user_id, first_name, last_name, id_card, visit_date, visit_type) 
      VALUES (?, ?, ?, ?, ?, 'unique')
    `;
    
    const [result] = await db.execute(query, [
      wp_user_id, first_name, last_name, id_card, visit_date
    ]);
    
    return result.insertId;
  }

  // Crear un nuevo visitante frecuente
  static async createFrequentVisitor(visitorData) {
    const { wp_user_id, first_name, last_name, id_card, 
            frequent_visit_description, frequent_visit_other_description } = visitorData;
    
    const query = `
      INSERT INTO condo360_visitors 
      (wp_user_id, first_name, last_name, id_card, visit_type, frequent_visit_description, frequent_visit_other_description) 
      VALUES (?, ?, ?, ?, 'frequent', ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      wp_user_id, first_name, last_name, id_card, 
      frequent_visit_description, frequent_visit_other_description
    ]);
    
    return result.insertId;
  }

  // Obtener historial de visitantes para un usuario
  static async getVisitorHistory(wp_user_id) {
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

  // Activar visitante frecuente
  static async activateFrequentVisitor(id) {
    const query = `
      UPDATE condo360_visitors 
      SET active = TRUE 
      WHERE id = ? AND visit_type = 'frequent'
    `;
    
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // Desactivar visitante frecuente
  static async deactivateFrequentVisitor(id) {
    const query = `
      UPDATE condo360_visitors 
      SET active = FALSE 
      WHERE id = ? AND visit_type = 'frequent'
    `;
    
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // Validar visitante por cédula
  static async validateVisitor(id_card) {
    const query = `
      SELECT v.*, u.display_name as owner_name, u.user_email as owner_email
      FROM condo360_visitors v
      JOIN wp_users u ON v.wp_user_id = u.ID
      WHERE v.id_card = ? AND (v.visit_type = 'frequent' AND v.active = TRUE OR v.visit_type = 'unique' AND v.visit_date = CURDATE())
    `;
    
    const [rows] = await db.execute(query, [id_card]);
    return rows[0] || null;
  }

  // Verificar si existe visitante único para una fecha
  static async uniqueVisitorExists(id_card, visit_date) {
    const query = `
      SELECT id 
      FROM condo360_visitors 
      WHERE id_card = ? AND visit_date = ? AND visit_type = 'unique'
    `;
    
    const [rows] = await db.execute(query, [id_card, visit_date]);
    return rows.length > 0;
  }

  // Verificar si existe visitante frecuente activo
  static async activeFrequentVisitorExists(id_card) {
    const query = `
      SELECT id 
      FROM condo360_visitors 
      WHERE id_card = ? AND visit_type = 'frequent' AND active = TRUE
    `;
    
    const [rows] = await db.execute(query, [id_card]);
    return rows.length > 0;
  }

  // Registrar llegada de visitante
  static async logVisitorArrival(visitor_id) {
    const query = `
      INSERT INTO condo360_visit_logs (visitor_id, arrival_datetime) 
      VALUES (?, NOW())
    `;
    
    const [result] = await db.execute(query, [visitor_id]);
    return result.insertId;
  }

  // Obtener visitantes únicos de hoy
  static async getTodaysUniqueVisitors() {
    const query = `
      SELECT v.*, u.display_name as owner_name
      FROM condo360_visitors v
      JOIN wp_users u ON v.wp_user_id = u.ID
      WHERE v.visit_type = 'unique' AND v.visit_date = CURDATE()
      ORDER BY v.created_at DESC
    `;
    
    const [rows] = await db.execute(query);
    return rows;
  }

  // Obtener registros de visitas para un visitante
  static async getVisitLogs(visitor_id) {
    const query = `
      SELECT * 
      FROM condo360_visit_logs 
      WHERE visitor_id = ? 
      ORDER BY arrival_datetime DESC
    `;
    
    const [rows] = await db.execute(query, [visitor_id]);
    return rows;
  }
}

module.exports = Visitor;