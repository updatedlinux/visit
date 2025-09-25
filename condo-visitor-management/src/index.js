const express = require('express');
const cors = require('./middleware/cors');
const visitorRoutes = require('./routes/visitorRoutes');
const swagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors);
app.use(express.json());

// Rutas
app.use('/visit', visitorRoutes);

// Documentación Swagger
app.use('/visit/api-docs', swagger.serve, swagger.setup);

// Endpoint de verificación de salud
app.get('/visit/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejador 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`Documentación API disponible en http://localhost:${PORT}/visit/api-docs`);
});

module.exports = app;