# Sistema de Gestión de Visitantes del Condominio - Estructura de Archivos

## Backend (Node.js + Express)
- `src/index.js` - Archivo de aplicación principal
- `src/config/database.js` - Configuración de base de datos
- `src/config/swagger.js` - Configuración de documentación Swagger
- `src/models/Visitor.js` - Modelo de visitante con operaciones de base de datos
- `src/controllers/visitorController.js` - Controlador de visitante con implementaciones de endpoints de API
- `src/routes/visitorRoutes.js` - Rutas de visitante con anotaciones Swagger
- `src/middleware/cors.js` - Configuración de middleware CORS

## Base de Datos
- `database/schema.sql` - Esquema SQL para crear tablas
- `database/setup.php` - Script PHP para configuración de base de datos
- `test-database.js` - Script de prueba de base de datos

## Plugin de WordPress
- `wordpress-plugin/condo-visitor-management.php` - Archivo principal del plugin
- `wordpress-plugin/assets/css/style.css` - Estilos CSS responsivos
- `wordpress-plugin/assets/js/script.js` - Funcionalidad JavaScript frontend
- `wordpress-plugin/templates/resident-form.php` - Plantilla de formulario de residente
- `wordpress-plugin/templates/security-dashboard.php` - Plantilla de panel de seguridad

## Configuración
- `package.json` - Dependencias y scripts de Node.js
- `.env.example` - Ejemplo de variables de entorno
- `README.md` - Instrucciones de instalación y uso
- `nginx-config.example` - Ejemplo de configuración de Nginx

## Endpoints de API
- POST `/visit/new` - Crear visitante único
- POST `/visit/new/frequent` - Crear visitante frecuente
- GET `/visit/history/:wp_user_id` - Obtener historial de visitantes
- PUT `/visit/frequent/:id/activate` - Activar visitante frecuente
- PUT `/visit/frequent/:id/deactivate` - Desactivar visitante frecuente
- GET `/visit/validate/:id_card` - Validar visitante por cédula
- POST `/visit/log/:visitor_id` - Registrar llegada de visitante
- GET `/visit/today` - Obtener visitantes de hoy
- GET `/visit/api-docs` - Documentación de API Swagger