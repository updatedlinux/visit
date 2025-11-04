const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

/**
 * @swagger
 * tags:
 *   name: Deliverys
 *   description: API para gestión de deliverys
 */

/**
 * @swagger
 * /delivery/new:
 *   post:
 *     tags: [Deliverys]
 *     summary: Crear un nuevo delivery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wp_user_id
 *               - name
 *               - company
 *               - delivery_date
 *             properties:
 *               wp_user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               company:
 *                 type: string
 *               delivery_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Delivery creado exitosamente
 *       400:
 *         description: Faltan campos requeridos o formato inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/new', deliveryController.createDeliveryController);

/**
 * @swagger
 * /delivery/user/{wp_user_id}:
 *   get:
 *     tags: [Deliverys]
 *     summary: Obtener deliverys de un usuario específico
 *     parameters:
 *       - in: path
 *         name: wp_user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario de WordPress
 *     responses:
 *       200:
 *         description: Lista de deliverys del usuario
 *       400:
 *         description: ID de usuario requerido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:wp_user_id', deliveryController.getDeliverysByUserController);

/**
 * @swagger
 * /delivery/search:
 *   get:
 *     tags: [Deliverys]
 *     summary: Buscar deliverys por nombre o email del propietario
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda (nombre o email del propietario)
 *     responses:
 *       200:
 *         description: Lista de deliverys encontrados
 *       400:
 *         description: Término de búsqueda requerido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search', deliveryController.searchDeliverysByOwnerController);

/**
 * @swagger
 * /delivery/all:
 *   get:
 *     tags: [Deliverys]
 *     summary: Obtener todos los deliverys
 *     responses:
 *       200:
 *         description: Lista de todos los deliverys
 *       500:
 *         description: Error interno del servidor
 */
router.get('/all', deliveryController.getAllDeliverysController);

/**
 * @swagger
 * /delivery/arrival/{delivery_id}:
 *   post:
 *     tags: [Deliverys]
 *     summary: Registrar llegada de un delivery
 *     parameters:
 *       - in: path
 *         name: delivery_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del delivery
 *     responses:
 *       200:
 *         description: Llegada registrada exitosamente
 *       400:
 *         description: ID de delivery requerido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/arrival/:delivery_id', deliveryController.logDeliveryArrivalController);

/**
 * @swagger
 * /delivery/logs/{delivery_id}:
 *   get:
 *     tags: [Deliverys]
 *     summary: Obtener logs de llegada de un delivery
 *     parameters:
 *       - in: path
 *         name: delivery_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del delivery
 *     responses:
 *       200:
 *         description: Lista de logs de llegada
 *       400:
 *         description: ID de delivery requerido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/logs/:delivery_id', deliveryController.getDeliveryLogsController);

module.exports = router;

