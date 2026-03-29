import {Request, Response} from 'express';
import * as UserRepository from '../persistence/userRepository';

/**
 * Registro de usuario
 * @function register
 */

//POST//
export const register = async (req: Request, res: Response) => {
    try{
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).json({message: "Todos los campos son obligatorios"})
        }
        const userId = await UserRepository.createUser({username, email, password});
        res.status(201).json({
            message: "Usuario creado correctamente",
            data: {id: userId, username, email}
        });
    }catch (error: any){
        if (error.code === '23505'){
            return res.status(400).json({message: "El usuario o email ya está registrado"})
        }
        res.status(500).json({message:" Error del servidor", error: error.message});
    }
};