import { Router } from "express";
import { createTask, seeTask } from "../../controllers/tasksController";

const router = Router();

/**
 * @swagger
 * /api/tasks/createTask:
 *  post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                     - title
 *                     - user_id
 *                 properties:
 *                     title:
 *                       type: string
 *                       example: Crear login
 *                     description:
 *                       type: string
 *                       example: Programar la lógica del registro
 *                     user_id:
 *                       type: integer
 *                       example: 6
 *     responses:
 *         201:
 *           description: Tarea creada exitosamente
 *         400:
 *           description: No se pudo crear la tarea, faltan datos
 *         500:
 *           description: Error del servidor
 */     

/**@name POST/api/tasks */
router.post('/createTask', createTask)
/**
 * @swagger
 * /api/tasks/{userId}:
 *  get:
 *    summary: Obtener todas las tareas de un usuario
 *    tags: [Tareas]
 *    parameters:
 *      - in: path
 *      name: userId
 *      required: true
 *      schema:
 *      type: integer
 *      description: ID del usuario (6)
 *    responses:
 *         200:
 *      description: Lista de tareas encontrada
 *         500:
 *      description: Error del servidor
 */

router.get('/:user_id', seeTask);


export default router;