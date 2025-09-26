-- Crear tabla condo360_visitors
CREATE TABLE IF NOT EXISTS condo360_visitors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  wp_user_id BIGINT UNSIGNED NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  id_card VARCHAR(50) NOT NULL,
  visit_date DATE NULL,
  visit_type ENUM('unique', 'frequent') NOT NULL,
  frequent_visit_description ENUM('Familia', 'Transporte Escolar', 'Proveedores', 'Otros') NULL,
  frequent_visit_other_description VARCHAR(255) NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_id_card_date (id_card, visit_date, visit_type),
  UNIQUE KEY unique_id_card_frequent_active (id_card, visit_type, active),
  FOREIGN KEY (wp_user_id) REFERENCES wp_users(ID) ON DELETE CASCADE
);

-- Crear tabla condo360_visit_logs
CREATE TABLE IF NOT EXISTS condo360_visit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  visitor_id BIGINT NOT NULL,
  arrival_datetime DATETIME NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES condo360_visitors(id) ON DELETE CASCADE
);