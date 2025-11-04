-- Agregar campo status a la tabla condo360_deliverys
ALTER TABLE condo360_deliverys 
ADD COLUMN status ENUM('announced', 'arrival_registered') DEFAULT 'announced' AFTER delivery_date;

-- Crear tabla para registrar llegadas de deliveries
CREATE TABLE IF NOT EXISTS condo360_delivery_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  delivery_id BIGINT NOT NULL,
  arrival_datetime DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (delivery_id) REFERENCES condo360_deliverys(id) ON DELETE CASCADE,
  INDEX idx_delivery_id (delivery_id),
  INDEX idx_arrival_datetime (arrival_datetime)
);

