const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

/**
 * @swagger
 * /new:
 *   post:
 *     summary: Crear un nuevo visitante único
 *     description: Registrar un nuevo visitante único para una fecha específica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitanteUnico'
 *     responses:
 *       201:
 *         description: Visitante único creado exitosamente
 *       400:
 *         description: Faltan campos requeridos
 *       409:
 *         description: Ya existe un visitante único con esta cédula para la fecha especificada
 *       500:
 *         description: Error interno del servidor
 */
router.post('/new', visitorController.createUniqueVisitor);

/**
 * @swagger
 * /new/frequent:
 *   post:
 *     summary: Crear un nuevo visitante frecuente
 *     description: Registrar un nuevo visitante frecuente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitanteFrecuente'
 *     responses:
 *       201:
 *         description: Visitante frecuente creado exitosamente
 *       400:
 *         description: Faltan campos requeridos o descripción inválida
 *       409:
 *         description: Ya existe un visitante frecuente activo con esta cédula
 *       500:
 *         description: Error interno del servidor
 */
router.post('/new/frequent', visitorController.createFrequentVisitor);

/**
 * @swagger
 * /history/{wp_user_id}:
 *   get:
 *     summary: Obtener historial de visitantes para un usuario
 *     description: Recuperar el historial de visitantes para un usuario específico de WordPress
 *     parameters:
 *       - in: path
 *         name: wp_user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de usuario de WordPress
 *     responses:
 *       200:
 *         description: Historial de visitantes recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialVisitantes'
 *       400:
 *         description: Falta wp_user_id
 *       500:
 *         description: Error interno del servidor
 */
router.get('/history/:wp_user_id', visitorController.getVisitorHistory);

/**
 * @swagger
 * /frequent/{id}/activate:
 *   put:
 *     summary: Activar un visitante frecuente
 *     description: Activar un visitante frecuente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del visitante
 *     responses:
 *       200:
 *         description: Visitante frecuente activado exitosamente
 *       400:
 *         description: Falta ID del visitante
 *       404:
 *         description: Visitante frecuente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/frequent/:id/activate', visitorController.activateFrequentVisitor);

/**
 * @swagger
 * /frequent/{id}/deactivate:
 *   put:
 *     summary: Desactivar un visitante frecuente
 *     description: Desactivar un visitante frecuente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del visitante
 *     responses:
 *       200:
 *         description: Visitante frecuente desactivado exitosamente
 *       400:
 *         description: Falta ID del visitante
 *       404:
 *         description: Visitante frecuente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/frequent/:id/deactivate', visitorController.deactivateFrequentVisitor);

/**
 * @swagger
 * /validate/{id_card}:
 *   get:
 *     summary: Validar un visitante por cédula
 *     description: Verificar si un visitante con la cédula dada es válido para hoy
 *     parameters:
 *       - in: path
 *         name: id_card
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de cédula del visitante
 *     responses:
 *       200:
 *         description: Resultado de validación del visitante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaValidarVisitante'
 *       400:
 *         description: Falta número de cédula
 *       404:
 *         description: Visitante no encontrado o no válido para hoy
 *       500:
 *         description: Error interno del servidor
 */
router.get('/validate/:id_card', visitorController.validateVisitor);

/**
 * @swagger
 * /log/{visitor_id}:
 *   post:
 *     summary: Registrar llegada de visitante
 *     description: Registrar la llegada de un visitante
 *     parameters:
 *       - in: path
 *         name: visitor_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del visitante
 *     responses:
 *       201:
 *         description: Llegada de visitante registrada exitosamente
 *       400:
 *         description: Falta ID del visitante
 *       500:
 *         description: Error interno del servidor
 */
router.post('/log/:visitor_id', visitorController.logVisitorArrival);

/**
 * @swagger
 * /today:
 *   get:
 *     summary: Obtener visitantes de hoy
 *     description: Recuperar todos los visitantes únicos programados para hoy
 *     responses:
 *       200:
 *         description: Visitantes de hoy recuperados exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/today', visitorController.getTodaysVisitors);

module.exports = router;