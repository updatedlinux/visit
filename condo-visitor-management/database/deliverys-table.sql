-- Crear tabla condo360_deliverys
CREATE TABLE IF NOT EXISTS condo360_deliverys (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  wp_user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  delivery_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wp_user_id) REFERENCES wp_users(ID) ON DELETE CASCADE,
  INDEX idx_wp_user_id (wp_user_id),
  INDEX idx_delivery_date (delivery_date),
  INDEX idx_created_at (created_at)
);

