import { Router } from "express";
import { createTask, seeTask, deleteTask } from "../../controllers/tasksController";

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
 * /api/tasks/{user_id}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario (6)
 *     responses:
 *       200:
 *         description: Lista de tareas encontrada
 *       500:
 *         description: Error del servidor
 */

router.get('/:user_id', seeTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: No se encontró la tarea
 *       500:
 *         description: Error del servidor
 */

router.delete('/:id', deleteTask);


export default router;