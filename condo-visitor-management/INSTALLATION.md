# Sistema de Gestión de Visitantes del Condominio - Guía de Instalación Completa

## Descripción General
Esta guía le ayudará a configurar el Sistema de Gestión de Visitantes del Condominio completo, incluyendo:
1. API backend de Node.js
2. Tablas de base de datos MySQL
3. Plugin de WordPress para integración frontend

## Requisitos Previos
- Node.js v14 o superior
- Base de datos MySQL (la misma que WordPress)
- Instalación de WordPress
- Nginx Proxy Manager (para descarga de SSL)

## Paso 1: Configuración del Backend

### 1.1 Instalar Dependencias
```bash
cd condo-visitor-management
npm install
```

### 1.2 Configurar Entorno
Cree un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Edite `.env` con sus credenciales de base de datos:
```
DB_HOST=localhost
DB_USER=su_usuario_de_base_de_datos
DB_PASSWORD=su_contraseña_de_base_de_datos
DB_NAME=su_base_de_datos_de_wordpress
PORT=3000
```

### 1.3 Crear Tablas de Base de Datos
Ejecute el esquema SQL:
```sql
-- Ejecute esto en su base de datos de WordPress
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
);

CREATE TABLE IF NOT EXISTS condo360_visit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  visitor_id BIGINT NOT NULL,
  arrival_datetime DATETIME NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES condo360_visitors(id) ON DELETE CASCADE
);
```

### 1.4 Iniciar el Servidor
```bash
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

### 1.5 Verificar Documentación de la API
Visite: http://localhost:3000/visit/api-docs

## Paso 2: Instalación del Plugin de WordPress

### 2.1 Cargar Plugin
1. Cargue la carpeta `wordpress-plugin` a su directorio de plugins de WordPress
2. Renombre la carpeta a `condo-visitor-management`
3. Active el plugin a través del panel de administración de WordPress

### 2.2 Configurar Plugin
1. Agregue el shortcode `[condo_resident_visitor_form]` a una página para residentes
2. Agregue el shortcode `[condo_security_dashboard]` a una página para personal de seguridad
3. Asegúrese de que los usuarios tengan los permisos adecuados para acceder a estas páginas

## Paso 3: Configuración de Nginx

### 3.1 Configurar Host Proxy en Nginx Proxy Manager
1. Cree un nuevo host proxy
2. Establezca el dominio a `api.bonaventurecclub.com`
3. Establezca el hostname/IP de reenvío a la IP de su servidor
4. Establezca el puerto de reenvío a `3000`
5. Habilite SSL con su certificado

## Paso 4: Pruebas

### 4.1 Probar Endpoints de la API
Use curl o Postman para probar los endpoints:
```bash
# Crear un visitante único
curl -X POST http://localhost:3000/visit/new \
  -H "Content-Type: application/json" \
  -d '{
    "wp_user_id": 1,
    "first_name": "Juan",
    "last_name": "Pérez",
    "id_card": "123456789",
    "visit_date": "2023-10-15"
  }'

# Validar visitante
curl http://localhost:3000/visit/validate/123456789
```

### 4.2 Probar Integración de WordPress
1. Visite la página del formulario de residente
2. Intente registrar un nuevo visitante
3. Visite la página del panel de seguridad
4. Intente validar un visitante por cédula

## Resolución de Problemas

### Problemas Comunes
1. **Error de Conexión a la Base de Datos**: Verifique las credenciales en su archivo `.env`
2. **Error de CORS**: Verifique la configuración de CORS en `src/middleware/cors.js`
3. **ID de Usuario de WordPress No Encontrado**: Asegúrese de que la tabla `wp_users` exista y tenga datos
4. **Problemas de Proxy de Nginx**: Verifique la configuración del proxy en Nginx Proxy Manager

### Soporte
Para ayuda adicional, consulte el archivo README.md o contacte al equipo de desarrollo.