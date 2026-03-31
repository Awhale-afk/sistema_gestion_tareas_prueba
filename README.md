Deploy: https://sistema-gestion-tareas-prueba.onrender.com/

Descripción:

To-do listo es una aplicación web como parte de una prueba técnica diseñada para como un sistema de gestión de tareas en donde el usuario puede registrarse, iniciar sesión de forma sencilla y segura y gestionar sus tareas. Esta gestión incluye crear, leer, actualizar y eliminar tareas a voluntad mediante una interfaz intuitiva y una API completa.

Arquitectura:
Como lo indicaban las instrucciones el proyecto siguió una estructura por capas para separar las responsabilidades y así organizar los archivos de mejor forma.
-Frontend: Se desarrolló con HTML, CSS y TypeScript (posteriormente traducido a JavaScript)
-Backend: Se desarrolló con Node.js, Express y TypeScript
-Persistencia de los datos: Se utilizó una base de datos relacional de PostgreSQL desde Neon.tech (Con la librería pg)
-Documentación: Se hizo la documentación por medio de Swagger para las rutas y con JSDoc para el código
-Deploy: Render
-----------------------------
Instalacion:
Clonación del repositorio:
```bash
   https://github.com/Awhale-afk/sistema_gestion_tareas_prueba.git
   npm install
```

Configuración del .env
PORT=3000 (en local)
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_bd?sslmode=require (Se usó Neon.tech para la base de datos, este proporciona todos los datos relacionados con la DB: usuario, contraseña, puerto, etc)

¿Como ejecutarlo?
En la consola, en desarrollo se ejecuta npm run dev. Esto confirmará la conexión con la base de datos y mostrará el puerto en el que está corriendo.

Comando para build y deploy:
Se configuró para correr en render con npm install && npm run build && npm run docs
-------------------------------
Tecnologías:
-npm install express pg cors dotenv swagger-ui-express => 
-npm install -D typescript ts-node-dev @types/express @types/node @types/pg @types/cors @types/swagger-ui-express

Sistema de control de versiones:
-Se utilizó Git

Documentación:
-npm install -D jsdoc rimraf

Acceso a documentación:
JSDOc: https://sistema-gestion-tareas-prueba.onrender.com/docs/
Swagger: https://sistema-gestion-tareas-prueba.onrender.com/api-docs/


