import {Request, Response} from 'express';
import * as UserRepository from '../persistence/userRepository';
import { pool } from '../persistence/databaseConnection';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * Registro de usuario
 * @function register
 */

//POST//
export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        //Verifica si el usuario existe (por email o username)
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "El usuario o email ya está registrado" });
        }

        //Encriptación de la contraseña con bcrypt//
        //Indica cuántas veces se procesa la encriptación//
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Insertar la contraseña encriptada (hashedPassword)
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        return res.status(201).json({
            message: "Usuario registrado con éxito",
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

/**
 * Login de usuario
 * @function login
 */

//POST//

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //Verificar que el usuario exista//
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        //Si no existe se devuelve un 404 porque no está autorizado//
        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = userQuery.rows[0];

        //Compara la contraseña enviada con el hash (la encriptada) que está guardado//
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email }, //Datos dentro del token (Payload)
            process.env.JWT_SECRET as string,    //Procesa el token generado como string//
            { expiresIn: '1h' }                  //Tiempo de existencia del token//
);

        //Respuesta exitosa//
        return res.status(200).json({
            message: "Bienvenido",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

/**
 * Borrado de usuario
 * @function deleteById
 */
//DELETE//

export const deleteById = async (req: Request, res: Response) =>{
   try{
        const {id} = req.params
    //Verifica si existe el usuario para ser borrado//
        const userExists = await pool.query(`
        SELECT * FROM users WHERE id = $1`,
        [id])
        
            if (userExists.rows.length === 0) {
                return res.status(404).json({message: "El usuario que intenta eliminar no existe"})
            };

            
        const userDeletion = await pool.query(`
        DELETE FROM users WHERE id = $1`,
        [id])
        return res.status(200).json({message: "Usuario eliminado con éxito: ", userDeletion})


   }catch (error){
    console.error("Error del servidor al intentar borrar", error);
    return res.status(500).json({message: "Error interno del servidor"});
   } 
    
};

/**
 * Obtención de todos los usuarios
 * @function generalGet
*/

//GET//

export const generalGet = async (req: Request, res: Response) =>{
    try{
        const obtainUsers = await pool.query(`
            SELECT id, username, email, created_at FROM users`)
            if (obtainUsers.rows.length === 0){
                return res.status(404).json({message: "No existen usuarios en la base de datos"})
            }

        return res.status(200).json({message: "Consulta exitosa. Mostrando registros: ", obtainUsers})
    }catch (error){
        console.error("Error del servidor al consultar", error)
        return res.status(500).json({message: "No se pudo ejecutar la consulta debido a error interno"})
    };
};