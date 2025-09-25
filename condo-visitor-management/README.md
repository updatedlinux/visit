# Sistema de Gestión de Visitantes del Condominio

Sistema de gestión de visitantes para condominios integrado con WordPress.

## Características

- API RESTful para gestión de visitantes
- Integración con usuarios de WordPress
- Registro de visitantes únicos y frecuentes
- Validación de visitantes para personal de seguridad
- Registro de visitas
- Documentación de API con Swagger
- Soporte de CORS para integración con WordPress

## Requisitos Previos

- Node.js v14 o superior
- Base de datos MySQL (la misma que WordPress)
- Instalación de WordPress con usuarios

## Instalación

1. Clone el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd condo-visitor-management
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

3. Configure las variables de entorno:
   Cree un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   DB_HOST=localhost
   DB_USER=su_usuario_de_base_de_datos
   DB_PASSWORD=su_contraseña_de_base_de_datos
   DB_NAME=su_base_de_datos_de_wordpress
   PORT=3000
   ```

4. Cree las tablas de base de datos requeridas:
   Ejecute el script SQL en `database/schema.sql` en su base de datos de WordPress.

5. Inicie el servidor:
   ```bash
   npm start
   ```
   
   Para desarrollo:
   ```bash
   npm run dev
   ```

## Documentación de la API

Una vez que el servidor esté en ejecución, puede acceder a la documentación de la API Swagger en:
```
http://localhost:3000/visit/api-docs
```

## Esquema de Base de Datos

El sistema utiliza dos tablas:

### condo360_visitors
Almacena información sobre los visitantes anunciados.

### condo360_visit_logs
Registra las llegadas de los visitantes.

## Integración con WordPress

El sistema está diseñado para trabajar con usuarios de WordPress. El campo `wp_user_id` en la tabla de visitantes hace referencia al campo `ID` en la tabla `wp_users`.

## Configuración de Nginx

Para implementar detrás de Nginx Proxy Manager con descarga de SSL, configure un host proxy con los siguientes ajustes:
- Hostname/IP de reenvío: IP de su servidor
- Puerto de reenvío: 3000 (o su puerto configurado)
- Esquema de reenvío: http
- SSL: Habilitado con su certificado

## Endpoints

Todos los endpoints tienen el prefijo `/visit`:

- `POST /visit/new` - Crear visitante único
- `POST /visit/new/frequent` - Crear visitante frecu2ente
- `GET /visit/history/:wp_user_id` - Obtener historial de visitantes
- `PUT /visit/frequent/:id/activate` - Activar visitante frecuente
- `PUT /visit/frequent/:id/deactivate` - Desactivar visitante frecuente
- `GET /visit/validate/:id_card` - Validar visitante por cédula
- `POST /visit/log/:visitor_id` - Registrar llegada de visitante
- `GET /visit/today` - Obtener visitantes de hoy
- `GET /visit/api-docs` - Documentación de API Swagger

## Consideraciones de Seguridad

- Asegúrese de implementar autenticación y autorización adecuadas para uso en producción
- Valide y saneé todos los datos de entrada
- Use HTTPS en producción
- Restrinja los orígenes de CORS solo a su sitio de WordPress