import { Router } from "express";
import {register} from '../../controllers/authController';

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
//router.post('/login')//

export default router;