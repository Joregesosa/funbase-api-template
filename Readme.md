# Funbase API Template

Este repositório fue creado para ayudar a los desarrolladores a crear una API RESTful utilizando express y sequelize. El objetivo es proporcionar una base sólida y fácil de usar para nuevos desarrolladores que deseen crear una API desde cero.  


## Requisitos previos
- Node.js
- npm o yarn
- mySQL 
- Postman o cualquier cliente HTTP para probar la API
- Conocimientos básicos de JavaScript y Node.js

## Instalación

```bash
npx create-fb-api <nombre-del-proyecto>
cd <nombre-del-proyecto> 
```
Las dependencias se instalarán automáticamente. Si no lo hacen, puedes instalarlas manualmente ejecutando:
```bash
npm install
```

Tambien puedes clonar el repositorio directamente y luego instalar las dependencias:

```bash
git clone https://github.com/tu-usuario/funbase-api-template.git
cd funbase-api-template
```

## Estructura del proyecto

```
📂 funbase-api-template
├── 📂 src
│   ├── 📂 config  
│   │   └── 📄 index.js 
│   ├── 📂 database
│   │   ├── 📂 migrations
│   │   │   └── 📄 index.js 
│   │   └── 📄 sequelize.js
│   ├── 📂 middlewares
│   │   ├── 📄 authMiddleware.js
│   │   └── 📄 errorMiddleware.js
│   ├── 📂 modules
│   │   ├── 📂 Auth
│   │   │   ├── 📄 controller.js
│   │   │   └── 📄 routes.js
│   │   ├── 📂 Users
│   │   │   ├── 📄 controller.js
│   │   │   ├── 📄 routes.js
│   │   │   └── 📄 model.js
│   ├── 📂 routes
│   │   ├── 📄 index.js
│   │   └── 📄 routes.js
│   ├── 📂 utils
│   │   ├── 📂 helpers
│   │   │    └── 📄 routeHelper.js
│   │   └── 📄 index.js 
│   └── 📄 app.js
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 package-lock.json 
├── 📄 package.json
└── 📄 README.md
```

### Descripción de la estructura del proyecto
- `src`: Contiene todo el código fuente de la API.
- `config/index.js`:  Contiene la lectura de las variables de entorno.
- `database/sequelize.js`:  Contiene la configuración de sequelize y la conexión a la base de datos.
- `database/migrations/migrations.js`: Contiene un array donde se registran todas las migraciones de la base de datos cada vez que se crea un nuevo modelo.
- `middlewares`: Contiene los middlewares de la API.
- `modules`: Contiene los módulos de la API. Cada módulo tiene su propio controlador, rutas y modelo. Puedes crear tantos módulos como necesites.
- `routes/index.js`:  Contiene la configuración de las rutas de la API. Aquí se importan todos los módulos y se configuran las rutas.
- `routes/routes.js`: Contiene un array donde se registran todas las rutas de la API. Cada vez que se crea una nueva ruta, se agrega a este array.
- `utils`: Contiene funciones y helpers que pueden ser utilizados en toda la API.
- `utils/helpers/routeHelper.js`: Contiene una función que ayuda a cargar las rutas de los módulos. Esta función se utiliza en `routes/index.js` para cargar las rutas de cada módulo.
- `app.js`: Contiene la configuración de la API. Aquí se configuran los middlewares, las rutas y el puerto de la API.
- `.env.example`: Contiene un ejemplo de las variables de entorno que se deben configurar en el archivo `.env`.
- `.gitignore`: Contiene los archivos y carpetas que se deben ignorar por git.


## Configuración de la base de datos
Para configurar la base de datos, sigue estos pasos:
1. Crea una base de datos en MySQL con el nombre que desees.
2. Copia el archivo `.env.example` y renómbralo a `.env`.   

3. Abre el archivo `.env` y configura las variables de entorno para la conexión a la base de datos. Asegúrate de que los valores coincidan con los de tu base de datos.

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_la_base_de_datos
DB_DIALECT=mysql
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=1d
```
4. Guarda los cambios y cierra el archivo.
5. Abre una terminal y navega hasta la carpeta del proyecto.

## Dependencias
- `express`: Framework web para Node.js.
- `sequelize`: ORM para Node.js que soporta varios dialectos de bases de datos.
- `mysql2`: Driver para MySQL y MariaDB.
- `dotenv`: Carga variables de entorno desde un archivo `.env`.
- `jsonwebtoken`: Implementación de JSON Web Tokens.
- `bcrypt`: Librería para encriptar contraseñas.
- `cors`: Middleware para habilitar CORS.
- `joi`: Librería para validar objetos JavaScript.
- `fb-modules`: Librería para crear módulos de API RESTful.

Entre todas las dependencias, `fb-modules` es la más importante, ya que es la que permite crear módulos de API RESTful de manera sencilla y rápida. Esta librería se encarga de crear las rutas, controladores y modelos de cada módulo, lo que facilita la creación de nuevas funcionalidades en la API.

Puedes aprender más sobre cómo utilizar `fb-modules` en el repositorio oficial: [fb-modules](https://github.com/jorgesosa-funval/fb-modules)


## Iniciar el servidor
Para iniciar el servidor, ejecuta el siguiente comando en la terminal:

```bash
npm run dev
```
Esto iniciará el servidor en modo desarrollo. Puedes acceder a la API en `http://localhost:3000`.
El puerto se puede cambiar en el archivo `.env`.

```bash
PORT=3000
```

Este Proyecto es de código abierto y está bajo la licencia MIT. Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o enviar un pull request. ¡Gracias por usar este template!
¡Feliz codificación!