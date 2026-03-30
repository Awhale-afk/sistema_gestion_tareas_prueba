import { Router } from "express";
import {register, login, deleteById} from '../../controllers/authController';
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Registrar un nuevo usuario
 *      tags: [Autenticación]
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                        - username
 *                        - email
 *                        - password
 *                    properties:
 *                      username:
 *                         type: string
 *                         example: emmanuel20
 *                      email:
 *                         type: string
 *                         example: emmanuel@correo.com
 *                      password:
 *                         type: string
 *                         example: password123
 *      responses:
 *          201:
 *              description: Usuario creado exitosamente
 *          400:
 *              description: Datos inválidos
 *          500:
 *              description: Error del servidor
 */


/**@name POST/api/auth/register */
router.post('/register', register)

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Iniciar sesión en una cuenta
 *      tags: [Autenticación]
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                        - email
 *                        - password
 *                    properties:
 *                      email:
 *                         type: string
 *                         example: emmanuel@correo.com
 *                      password:
 *                         type: string
 *                         example: password123
 *      responses:
 *          200:
 *              description: Sesión iniciada
 *          400:
 *              description: Datos inválidos
 *          500:
 *              description: Error del servidor
 */
/**@name POST/api/auth/login */
router.post('/login', login)


/**
 * @swagger
 * /api/auth/deleteById/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID (Con token generado en el login)
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       401:
 *         description: No autorizado (Falta el token de acceso)
 *       403:
 *         description: Token inválido o expirado
 *       404:
 *         description: El usuario no existe en la base de datos
 *       500:
 *         description: Error interno del servidor
 */

/**@name DELETE/api/auth/deleteById */
router.delete('/deleteById/id:', authenticateToken, deleteById)



export default router;