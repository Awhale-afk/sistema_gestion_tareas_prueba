Bitácora de desarrollo:
Fecha: 27/03/2026

-Creación básica del front-end:
*Se creó el HTML y CSS de las páginas de inicio de sesión y registro de usuario

-Creación del entorno de desarrollo:
*Se abrió un proyecto en GitHub vinculando Vs code con este por medio de git.
*Se preparó la estructura de carpetas con mkdir -Path "src/api/routes", "src/api/middlewares", "src/controllers", "src/services", "src/persistence", "src/config", "src/utils", "src/models"
*Se inició node y se instaló express por medio de npm init -y y npm install express dotenv cors
*Se instalaron las dependencias de desarrollo en el proyecto (Typescript) y definiciones de tipos (como "traductor" para typescript con respecto a express) con npm install -D typescript ts-node-dev @types/express @types/node @types/cors
*Se escribe el archivo de configuración con patrón Singleton para la creación de la clase con los datos de puerto, url de la base de datos y tokens

Fecha: 28/03/2026

*Se crea el archivo server.ts que contiene la importación de configuración de express, cors y la instancia (objeto) de la clase Config (correspondiente al patrón Singleton)
*Se añade  la constante app para usar express y cors. A demás se crea el primer endpoint de prueba ('/') para encender la API con app.get en local
*Se crea un archivo tsconfig.json que contiene información sobre el compilador para la traducción de TS a JS en su versión 2022, así como verificaciones de seguridad para evitar dejar alguna variable sin tipo (strict:true)
*Se instala la herramienta JSDocs para la documentación del código: npm install -D jsdoc clean-jsdoc-theme
*Hubo varios errores de compatibilidad con la herramienta y también a la hora de organizar la información de los comentarios en la documentación de la web que generaba, se resolvió aplicando etiquetas @ dentro de los items que se querían mostrar en los módulos
*Se crea la base de datos gestion_tareas_database con AWS en Neon.tech
*Se instala la librería pg para poder hacer consultas SQL a postgreSQL con: npm install pg && npm install -D @types/pg
*Se instala swagger para la documentación de endpoints con npm install swagger-ui-express swagger-jsdoc y la "traducción" de TypeScript con npm install -D @types/swagger-ui-express @types/swagger-jsdoc
*Se configura swagger en src/config/swagger.ts

Fecha 29/03/2026
*Creación de tabla de tareas en PostgreSQL y controlador de tareas (tasksController.ts) para procesar la lógica del registro, obtención, borrado y modificación de las mismas.
*Creación de operaciones del CRUD para las tareas (POST, DELETE, GET, PUT)











-Uso de la IA:
*Se le pide explicación sobre el uso de @types dado que no lo conocía. Prompt: Explícame mejor lo de los paquetes de definiciones de tipos. Ese es el nombre técnico? Y en palabras simples que son? Diccionarios para convertir instrucciones de express y node (originalmente diseñadas para Js) a Typescript?
No se añadió código dado que solo fue una ampliación de conocimiento.
*Me encuentro con un error de compilación a la hora de encender la API en el endpoint de prueba. La solución que propone la IA (Gemini en este caso) es la creación de un archivo .json para escribir los parámetros que necesita el compilador para traducir de TypeScript a JavaScript. Después de hacer una búsqueda en Stack Overflow, entendí que los ajustes propuestos por Gemini son compatibles con el proyecto y ayudarían a reducir problemas posteriores. Por lo tanto se hizo el cambio propuesto en el archivo tsconfig.json
Error: 
[ERROR] 13:26:51 ⨯ Unable to compile TypeScript:
error TS5107: Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.
error TS5109: Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'
Solución: Se especifica la versión de JavaScript a la que va a ser traducido (2022), y el valor de module y moduleResolution a NodeNext
*Se le pide a Gemini que revise la estructura de las rutas como medida preventiva para estar seguro antes de continuar con la creación de las rutas y controladores. 
Prompt: Antes de empezar con los controladores y rutas, revisa la estructura de carpetas y archivos que tengo para evitar algún inconveniente