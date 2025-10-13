const mysql = require('mysql2');
require('dotenv').config();

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wordpress',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '-04:00' // Configurar zona horaria de Venezuela (GMT-4)
});

// Exportar el pool promise para uso con async/await
module.exports = pool.promise();