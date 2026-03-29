import{pool} from './databaseConnection'
import {User} from '../models/userModel'

/**
 * @module UserRepository
 */

/**
 *  
 * @name SQLQueryUserRegister
 */
export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<number> =>{
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id     
    `; //Se usan $ como placeholders en lugar de ?//
        //RETURNING id devuelve el id que se genera con el nuevo usuario//

    const values = [user.username, user.email, user.password];

    const result = await pool.query(query, values);
    return result.rows[0].id
}