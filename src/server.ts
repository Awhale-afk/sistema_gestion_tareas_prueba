/**@module Servidor */
/**@ignore Importa configuraciones de node modules/@types (Es decir @types/express @types/node @types/cors) 
como "traductores" para Typescript.
Viene de node_modules/@types/express/index.ts/linea 42-44.
Se puede acceder a ellos con Ctrl + click en los parámetros {}*/
import express, {Application, Request, Response} from 'express'; 

/**@ignore Importa configuraciones sobre las conexiones para tener control sobre peticiones HTTP que vengan de un lugar diferente al que tiene la API (Puerto, Dominio url y protocolo (http))*/
import cors from 'cors';        
/**@ignore Se importa la constante config que contiene la instancia (objeto) de la clase Config en el archivo config.ts */
import {config} from './config/config.js' 
const app: Application = express();
const PORT = config.PORT;

app.use(express.json());
/**Pemite las peticiones HTTP de lugares externos a la API*/
app.use(cors());


app.get('/', (req: Request, res: Response) => {     //Enpoint de prueba para encender la API//
    res.json({message: "API encendida"})

});

app.listen(PORT, () =>{
    console.log(`Corriendo en: " + http://localhost:${PORT}`)
});

