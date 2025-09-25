<?php
/**
 * Script de configuración de base de datos para Gestión de Visitantes del Condominio
 * 
 * Este script crea las tablas de base de datos requeridas para el sistema de gestión de visitantes.
 * Debe ejecutarse una vez durante la configuración inicial.
 */

// Configuración de conexión a la base de datos (actualizar con tus configuraciones de WordPress)
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario_de_base_de_datos');
define('DB_PASSWORD', 'tu_contraseña_de_base_de_datos');
define('DB_NAME', 'tu_base_de_datos_de_wordpress');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Crear tabla condo360_visitors
    $sql = "
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
          UNIQUE KEY unique_id_card_date (id_card, visit_date),
          UNIQUE KEY unique_id_card_frequent (id_card),
          FOREIGN KEY (wp_user_id) REFERENCES wp_users(ID) ON DELETE CASCADE
        )
    ";
    
    $pdo->exec($sql);
    echo "Tabla condo360_visitors creada exitosamente\n";
    
    // Crear tabla condo360_visit_logs
    $sql = "
        CREATE TABLE IF NOT EXISTS condo360_visit_logs (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          visitor_id BIGINT NOT NULL,
          arrival_datetime DATETIME NOT NULL,
          FOREIGN KEY (visitor_id) REFERENCES condo360_visitors(id) ON DELETE CASCADE
        )
    ";
    
    $pdo->exec($sql);
    echo "Tabla condo360_visit_logs creada exitosamente\n";
    
    echo "¡Configuración de base de datos completada exitosamente!\n";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}