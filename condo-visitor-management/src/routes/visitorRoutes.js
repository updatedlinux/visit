const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Crear un nuevo visitante único
router.post('/new', visitorController.createUniqueVisitor);

// Crear un nuevo visitante frecuente
router.post('/new/frequent', visitorController.createFrequentVisitor);

// Obtener historial de visitantes para un usuario de WordPress
router.get('/history/:wp_user_id', visitorController.getVisitorHistory);

// Activar un visitante frecuente
router.put('/frequent/:id/activate', visitorController.activateFrequentVisitor);

// Desactivar un visitante frecuente
router.put('/frequent/:id/deactivate', visitorController.deactivateFrequentVisitor);

// Validar un visitante por cédula
router.get('/validate/:id_card', visitorController.validateVisitor);

// Registrar llegada de visitante
router.post('/log/:visitor_id', visitorController.logVisitorArrival);

// Obtener visitantes de hoy
router.get('/today', visitorController.getTodaysVisitors);

module.exports = router;