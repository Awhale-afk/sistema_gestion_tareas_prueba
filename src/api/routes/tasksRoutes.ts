import { Router } from "express";
import { createTask, seeTask, deleteTask, modifyTask, updateTaskStatus} from "../../controllers/tasksController";
import { authenticateToken } from '../middlewares/authMiddleware';

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
router.post('/createTask', authenticateToken, createTask)

/**
 * @swagger
 * /api/tasks/{user_id}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario (Por medio de una autorización de token web)
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       401:
 *         description: No autorizado (Falta token)
 *       403:
 *         description: Token inválido o expirado
 */

router.get('/:user_id', authenticateToken, seeTask);

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

/**
 * @swagger
 * /api/tasks:
 *   put:
 *     summary: Actualizar una tarea (permite cambios parciales)
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la tarea que quieres modificar
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Nuevo título (opcional)
 *                 example: Tarea actualizada
 *               description:
 *                 type: string
 *                 description: Nueva descripción (opcional)
 *                 example: Esta es una nueva descripción
 *               status:
 *                 type: boolean
 *                 description: Nuevo estado de la tarea (opcional)
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *       400:
 *         description: Error en la solicitud (ej. falta el ID)
 *       404:
 *         description: No se encontró la tarea con ese ID
 *       500:
 *         description: Error interno del servidor
 */
/**@name PUT/api/tasks */
router.put('/', modifyTask)

/**@name PATCH/api/tasks */
router.patch('/updateStatus/:id', authenticateToken, updateTaskStatus);

export default router;