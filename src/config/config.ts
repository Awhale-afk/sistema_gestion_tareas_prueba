import dotenv from 'dotenv'; //Busca credenciales, API keys, entre otras cosas del .env// Se importa la librería dotenv desde el archivo dotenv de node_modules//

class Config{
    private static instance: Config;        /*La clase Config establece que datos se deben buscar y que de que tipo son. 
                                            Están programados para SOLO lectura, no se pueden modificar por fuera de la clase*/

    public readonly PORT: number;
    public readonly DB_URL: string;
    public readonly TOKEN: string;

    private constructor(){
        this.PORT = parseInt(process.env.PORT || '3000', 10);
        this.DB_URL = process.env.DB_URL || '';
        this.TOKEN = process.env.TOKEN || 'secret';

        if (!this.DB_URL){                  //Validación de la url de la base de datos//
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
    export const config = Config.getInstance(); //exporta una constante que guarda la instancia de la clase Config definida arriba lineas 3-20//