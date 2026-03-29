import {Request, Response} from 'express';
import {pool} from '../persistence/databaseConnection';

//POST//

export const createTask = async (req: Request, res: Response) =>{
    try{
        const {title, description, user_id} = req.body;
        const newTask = await pool.query(
            `INSERT INTO tasks (title, description, user_id) 
            VALUES ($1, $2, $3)
            RETURNING *`,
            [title, description, user_id]
        );
        return res.status(201).json(newTask.rows[0]);
}catch (error){
    console.error("Error. No se pudo crear la tarea", error);
    return res.status(500).json({message:"Error del servidor"});
    }
};