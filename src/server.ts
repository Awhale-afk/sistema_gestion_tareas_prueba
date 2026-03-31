/**@module Servidor */
/* Importa configuraciones de node modules/"@types" (Es decir @types/express @types/node @types/cors) 
como "traductores" para Typescript.
Viene de node_modules/@types/express/index.ts/linea 42-44.
Se puede acceder a ellos con Ctrl + click en los parámetros {}*/
import express, {Application, Request, Response} from 'express'; 

//Importa la constante que hace la conexión a la DB//
import { testConnection } from './persistence/databaseConnection';

//Importa configuraciones sobre las conexiones para tener control sobre peticiones HTTP que vengan de un lugar diferente al que tiene la API (Puerto, Dominio url y protocolo (http))*/
import cors from 'cors';    
import swaggerUi from 'swagger-ui-express';
import path from 'path'
import { swaggerDocs } from './config/swagger';

 // Se importa la constante config que contiene la instancia (objeto) de la clase Config en el archivo config.ts */
import {config} from './config/config' 





const app: Application = express();
const PORT = config.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
/**Pemite las peticiones HTTP de lugares externos a la API
 * @public
 * @name Middlewares_Globales
 * @function
 * @memberof module:Servidor
*/
app.use(cors());

import authRoutes from './api/routes/authRoutes'
app.use('/api/auth', authRoutes)

import taskRoutes from './api/routes/tasksRoutes';
app.use('/api/tasks', taskRoutes);


const publicPath = path.resolve(__dirname, '../web');
console.log("Serviendo archivos desde:", publicPath);

app.use(express.static(publicPath));

app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});
app.get('/registro', (req, res) => {
    res.sendFile(path.join(publicPath, 'registro.html'));
});

app.get('/', (req: Request, res: Response) => {  //Redirige / al login//
    res.redirect('/login');
});


app.get('/', (req: Request, res: Response) => {     //Enpoint de prueba para encender la API en local//
    res.json({message: "API encendida"})

});

//Endpoint que redirige hacia la gestión de tareas//
app.get('/tareas', (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname, '../web/tareas.html'));
})



app.listen(PORT, async () =>{
    console.log(`Corriendo en: http://localhost:${PORT}`);
    await testConnection();
});



