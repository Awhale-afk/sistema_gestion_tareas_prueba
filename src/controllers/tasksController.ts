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

//GET//

export const seeTask = async (req: Request, res: Response) =>{
    try{
        const {user_id} = req.params;
        const getTask = await pool.query(
            `SELECT * FROM tasks WHERE user_id = $1;`,
            [user_id]
        )
        return res.status(200).json(getTask.rows[0])
    }catch (error){
        console.error("Error. No se pudieron consultar las tareas ", error);
        return res.status(500).json({message:"Error del servidor"});
    }
};

//DELETE//

export const deleteTask = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const eraseTask = await pool.query(
            `DELETE FROM tasks WHERE id = $1;`,
            [id]
        )
        if(eraseTask.rowCount === 0){
            return res.status(404).json({message: "Tarea a borrar no encontrada"})
        }
            return res.status(200).json({message: "Tarea borrada con éxito"})
    }catch (error){
        console.error("Error. No se pudo borrar la tarea ", error);
        return res.status(500).json({message: "Error del servidor"})
    }
};