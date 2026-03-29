//Se impora la librería de pg para las consultas SQL en postgre//
import pg from 'pg';
import {config} from '../config/config' //Se importa la constante config que contiene la creación de la instancia basada en la clase//

/** Modulo de conexión a PostgreSQL
 * @module Persistence
 */

const {Pool} = pg;

/**
 * Conexiones configuradas con la URI (Uniform Resource Identifier) de la base de datos
 * @type {Pool}
 */
export const pool = new Pool({
    connectionString: config.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

/**Estado de la conexión de la base de datos 
 * @function testConnection
 * @returns {Promise<void>}
*/

export const testConnection = async (): Promise<void> => {
    try{
        const client = await pool.connect();
        console.log('Conexión a la base de datos efectuada')
    }catch (error){
        console.error('Error al conectar a la base de datos: ', error)
        process.exit(1);
    }
};
