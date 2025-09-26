const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

/**
 * @swagger
 * tags:
 *   name: Visitantes
 *   description: API para gestión de visitantes
 */

/**
 * @swagger
 * /new:
 *   post:
 *     tags: [Visitantes]
 *     summary: Crear o actualizar un visitante único
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wp_user_id
 *               - first_name
 *               - last_name
 *               - id_card
 *               - visit_date
 *             properties:
 *               wp_user_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               id_card:
 *                 type: string
 *               visit_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Visitante único creado o actualizado exitosamente
 *       400:
 *         description: Faltan campos requeridos o formato inválido
 *       409:
 *         description: Conflicto de visitante frecuente activo
 *       500:
 *         description: Error interno del servidor
 */
router.post('/new', visitorController.createUniqueVisitorController);

router.post('/new/frequent', visitorController.createFrequentVisitorControllerController);

router.post('/new/frequent', visitorController.createFrequentVisitorController);

/**
 * @swagger
 * /new/frequent:
 *   post:
 *     tags: [Visitantes]
 *     summary: Crear un nuevo visitante frecuente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wp_user_id
 *               - first_name
 *               - last_name
 *               - id_card
 *               - frequent_visit_description
 *             properties:
 *               wp_user_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               id_card:
 *                 type: string
 *               frequent_visit_description:
 *                 type: string
 *                 enum: ["Familia", "Transporte Escolar", "Proveedores", "Otros"]
 *               frequent_visit_other_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visitante frecuente creado exitosamente
 *       400:
 *         description: Faltan campos requeridos o descripción inválida
 *       409:
 *         description: Conflicto de visitante frecuente activo
 *       500:
 *         description: Error interno del servidor
 */
router.post('/new/frequent', visitorController.createFrequentVisitor);

/**
 * @swagger
 * /visit/history/{wp_user_id}:
 *   get:
 *     tags: [Visitantes]
 *     summary: Obtener historial de visitantes para un usuario
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
 *               type: object
 *               properties:
 *                 visitor_history:
 *                   type: array
 *                   items:
 *                     type: object
 *     400:
 *       description: Falta wp_user_id
 *     500:
 *       description: Error interno del servidor
 */
router.get('/history/:wp_user_id', visitorController.getVisitorHistory);

/**
 * @swagger
 * /visit/frequent/{id}/activate:
 *   put:
 *     tags: [Visitantes]
 *     summary: Activar un visitante frecuente
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
 * /visit/frequent/{id}/deactivate:
 *   put:
 *     tags: [Visitantes]
 *     summary: Desactivar un visitante frecuente
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
 * /visit/validate/{id_card}:
 *   get:
 *     tags: [Visitantes]
 *     summary: Validar un visitante por cédula
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
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 visitor:
 *                   type: object
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
 * /visit/log/{visitor_id}:
 *   post:
 *     tags: [Visitantes]
 *     summary: Registrar llegada de visitante
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
 * /visit/today:
 *   get:
 *     tags: [Visitantes]
 *     summary: Obtener visitantes de hoy
 *     responses:
 *       200:
 *         description: Visitantes de hoy recuperados exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/today', visitorController.getTodaysVisitors);

module.exports = router;