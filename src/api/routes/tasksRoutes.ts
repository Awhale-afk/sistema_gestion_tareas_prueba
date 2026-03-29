import { Router } from "express";
import { createTask } from "../../controllers/tasksController";

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

export default router;