/**@module Configuracion */


//Busca credenciales, API keys, entre otras cosas del .env// Se importa la librería dotenv desde el archivo dotenv de node_modules*/
import dotenv from 'dotenv'; 
dotenv.config();


/**La clase Config establece que datos se deben buscar y que de que tipo son. 
Están programados para SOLO lectura, no se pueden modificar por fuera de la clase
@class 
*/

class Config{
    
    private static instance: Config;        
    /**Configuración del puerto del servidor 
     * @readonly
     * @type {number}
     * @public
     * @memberof module:Configuracion
     */
    public readonly PORT: number;
    /**Configuración de la dirección URL de la base de datos 
     * @readonly
     * @type {string}
     * @public
     * @memberof module:Configuracion
     */
    public readonly DB_URL: string;
    /**Configuración del token 
     * @readonly
     * @type {string}
     * @public
     * @memberof module:Configuracion
    */
    public readonly TOKEN: string;

    private constructor(){
        this.PORT = parseInt(process.env.PORT || '3000', 10);
        this.DB_URL = process.env.DB_URL || '';
        this.TOKEN = process.env.TOKEN || 'secret';

        /**Validación de la url de la base de datos*/
        if (!this.DB_URL){                  
            console.warn("DB_URL is not defined in .env")
        }

    }



    public static getInstance(): Config{
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
        }
}   

    /**Exporta una constante que guarda la instancia de la clase Config definida arriba*/
    export const config = Config.getInstance();  //lineas 3-20//