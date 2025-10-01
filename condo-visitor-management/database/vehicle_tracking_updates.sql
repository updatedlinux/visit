-- Consultas SQL para agregar funcionalidad de seguimiento de vehículos
-- Ejecutar estas consultas en la base de datos para habilitar el tracking de vehículos

-- 1. Agregar columna para tipo de visita (peatonal/vehículo) en la tabla de logs
ALTER TABLE condo360_visit_logs 
ADD COLUMN visit_type ENUM('pedestrian', 'vehicle') NOT NULL DEFAULT 'pedestrian' 
COMMENT 'Tipo de visita: peatonal o vehículo';

-- 2. Agregar columna para placa del vehículo en la tabla de logs
ALTER TABLE condo360_visit_logs 
ADD COLUMN vehicle_plate VARCHAR(20) NULL 
COMMENT 'Placa del vehículo (solo para visitas tipo vehicle)';

-- 3. Agregar índice para mejorar consultas por tipo de visita
CREATE INDEX idx_visit_logs_type ON condo360_visit_logs(visit_type);

-- 4. Agregar índice para consultas por placa de vehículo
CREATE INDEX idx_visit_logs_plate ON condo360_visit_logs(vehicle_plate);

-- 5. Agregar restricción para asegurar que las visitas tipo 'vehicle' tengan placa
ALTER TABLE condo360_visit_logs 
ADD CONSTRAINT chk_vehicle_plate 
CHECK (
    (visit_type = 'pedestrian' AND vehicle_plate IS NULL) OR 
    (visit_type = 'vehicle' AND vehicle_plate IS NOT NULL AND LENGTH(TRIM(vehicle_plate)) > 0)
);

-- 6. Crear tabla para historial de vehículos (opcional, para tracking avanzado)
CREATE TABLE IF NOT EXISTS condo360_vehicle_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visitor_id INT NOT NULL,
    vehicle_plate VARCHAR(20) NOT NULL,
    entry_datetime DATETIME NOT NULL,
    exit_datetime DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (visitor_id) REFERENCES condo360_visitors(id) ON DELETE CASCADE,
    INDEX idx_vehicle_history_plate (vehicle_plate),
    INDEX idx_vehicle_history_entry (entry_datetime),
    INDEX idx_vehicle_history_visitor (visitor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Historial de entrada y salida de vehículos';

-- 7. Crear vista para consultas rápidas de visitas con vehículos
CREATE OR REPLACE VIEW condo360_visits_with_vehicles AS
SELECT 
    vl.id as log_id,
    vl.visitor_id,
    vl.arrival_datetime,
    vl.visit_type,
    vl.vehicle_plate,
    v.first_name,
    v.last_name,
    v.id_card,
    v.visit_type as visitor_type,
    u.display_name as owner_name,
    u.user_email as owner_email
FROM condo360_visit_logs vl
JOIN condo360_visitors v ON vl.visitor_id = v.id
JOIN wp_users u ON v.wp_user_id = u.ID
ORDER BY vl.arrival_datetime DESC;

-- 8. Crear función para obtener estadísticas de vehículos por día
DELIMITER //
CREATE FUNCTION GetVehicleStatsByDate(check_date DATE) 
RETURNS JSON
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_OBJECT(
        'date', check_date,
        'total_visits', COUNT(*),
        'pedestrian_visits', SUM(CASE WHEN visit_type = 'pedestrian' THEN 1 ELSE 0 END),
        'vehicle_visits', SUM(CASE WHEN visit_type = 'vehicle' THEN 1 ELSE 0 END),
        'unique_vehicles', COUNT(DISTINCT vehicle_plate)
    ) INTO result
    FROM condo360_visit_logs 
    WHERE DATE(arrival_datetime) = check_date;
    
    RETURN result;
END//
DELIMITER ;

-- 9. Crear procedimiento para registrar salida de vehículo
DELIMITER //
CREATE PROCEDURE RegisterVehicleExit(
    IN p_visitor_id INT,
    IN p_vehicle_plate VARCHAR(20),
    IN p_exit_datetime DATETIME
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el historial de vehículos
    UPDATE condo360_vehicle_history 
    SET exit_datetime = p_exit_datetime,
        updated_at = CURRENT_TIMESTAMP
    WHERE visitor_id = p_visitor_id 
      AND vehicle_plate = p_vehicle_plate 
      AND exit_datetime IS NULL;
    
    COMMIT;
END//
DELIMITER ;

-- 10. Consultas de ejemplo para verificar la implementación

-- Verificar estructura de la tabla modificada
-- DESCRIBE condo360_visit_logs;

-- Verificar restricciones
-- SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE 
-- FROM information_schema.TABLE_CONSTRAINTS 
-- WHERE TABLE_NAME = 'condo360_visit_logs' AND TABLE_SCHEMA = DATABASE();

-- Verificar índices
-- SHOW INDEX FROM condo360_visit_logs;

-- Ejemplo de inserción de visita peatonal
-- INSERT INTO condo360_visit_logs (visitor_id, arrival_datetime, visit_type) 
-- VALUES (1, NOW(), 'pedestrian');

-- Ejemplo de inserción de visita con vehículo
-- INSERT INTO condo360_visit_logs (visitor_id, arrival_datetime, visit_type, vehicle_plate) 
-- VALUES (1, NOW(), 'vehicle', 'ABC-123');

-- Ejemplo de consulta de estadísticas
-- SELECT GetVehicleStatsByDate(CURDATE()) as today_stats;

-- Ejemplo de consulta de visitas con vehículos del día
-- SELECT * FROM condo360_visits_with_vehicles 
-- WHERE DATE(arrival_datetime) = CURDATE() 
-- AND visit_type = 'vehicle';
