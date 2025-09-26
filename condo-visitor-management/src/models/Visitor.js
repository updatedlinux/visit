// Obtener historial de visitantes para un usuario de WordPress
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

  // Actualizar estado de visitante frecuente
  static async updateFrequentVisitorStatus(id, active) {
    const query = `
      UPDATE condo360_visitors 
      SET active = ? 
      WHERE id = ? AND visit_type = 'frequent'
    `;
    const [result] = await db.execute(query, [active ? 1 : 0, id]);
    return result;
  }

  // Validar visitante por cédula para el día actual
  static async validateVisitor(id_card) {
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
  static async logVisitorArrival(visitor_id) {
    const query = `
      INSERT INTO condo360_visitor_logs (visitor_id, arrival_time)
      VALUES (?, NOW())
    `;
    const [result] = await db.execute(query, [visitor_id]);
    return result;
  }

  // Obtener visitantes de hoy
  static async getTodaysVisitors() {
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
}

module.exports = Visitor;