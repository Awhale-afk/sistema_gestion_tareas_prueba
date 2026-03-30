import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {config} from './config'



const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Tareas',
            version: '1.0.0',
            description: 'Documentación técnica del sistema de gestión de tareas con PostgreSQL.',
        },
        servers: [
            {
                //Puerto de URL//
                url: `http://localhost:${config.PORT || 3000}`, 
                description: 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
            bearerAuth: {       
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
                }
            }
        }
    },
    //Se le indica a Swagger donde se encuentran los comentarios de los cuales tiene que hacer la documentación//
    apis: ['./src/api/routes/*.ts', './src/controllers/*.ts'], 
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);