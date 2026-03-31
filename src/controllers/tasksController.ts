import {Request, Response} from 'express';
import {pool} from '../persistence/databaseConnection';

//POST//

export const createTask = async (req: Request, res: Response) =>{
    try{
        const {title, description, user_id, limit_date} = req.body;
        const newTask = await pool.query(
            `INSERT INTO tasks (title, description, user_id, limit_date) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, description, user_id, limit_date]
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
        return res.status(200).json(getTask.rows)
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

//PUT//

export const modifyTask = async (req: Request, res: Response) => {
    try {
        const id = req.body.id || req.params.id;
        const { title, description, status, limit_date } = req.body;

        if (!id) return res.status(400).json({ message: "ID requerido" });

        const currentTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        
        if (currentTask.rowCount === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        
        const task = currentTask.rows[0];

        const finalTitle = title !== undefined ? title : task.title;
        const finalDesc = description !== undefined ? description : task.description;
        const finalStatus = status !== undefined ? status : task.status;
        const finalDate = limit_date !== undefined ? limit_date : task.limit_date;

        const result = await pool.query(
            `UPDATE tasks SET title = $1, description = $2, status = $3, limit_date = $4 
             WHERE id = $5 RETURNING *`,
            [finalTitle, finalDesc, finalStatus, finalDate, id]
        );

        return res.status(200).json({ 
            message: "Tarea actualizada correctamente", 
            task: result.rows[0] 
        });

    } catch (error) {
        console.error("Error en el UPDATE:", error);
        return res.status(500).json({ message: "Error interno" });
    }
};

//POST//
export const updateTaskStatus = async (req: Request, res: Response) => {
    const { id } = req.params; //id de la tarea que se va a modificar
    const { status } = req.body; //El nuevo estado//

    try {
        const result = await pool.query(
            "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *;",
            [status, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        return res.status(200).json({ message: "Estado actualizado", task: result.rows[0] });
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};