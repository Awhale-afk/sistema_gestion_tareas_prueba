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



-Uso de la IA:
*Se le pide explicación sobre el uso de @types dado que no lo conocía. Prompt: Explícame mejor lo de los paquetes de definiciones de tipos. Ese es el nombre técnico? Y en palabras simples que son? Diccionarios para convertir instrucciones de express y node (originalmente diseñadas para Js) a Typescript?
No se añadió código dado que solo fue una ampliación de conocimiento.