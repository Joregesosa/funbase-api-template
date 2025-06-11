import { Sequelize } from "sequelize";
import config from "#config/index.js";
import readline from "readline";

const { database, password, port, host, user, dialect } = config.db;

// Primero creamos una conexión sin especificar la base de datos
const sequelizeTemp = new Sequelize("", user, password, {
  host,
  dialect,
  port,
});

// Función para crear la base de datos
const createDatabase = async () => {
  try {
    await sequelizeTemp.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
    console.log(`Base de datos '${database}' creada exitosamente.`);
    await sequelizeTemp.close();
    return true;
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
    await sequelizeTemp.close();
    return false;
  }
};

// Función para preguntar al usuario
const askUser = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `La base de datos '${database}' no existe. ¿Desea crearla? (s/n): `,
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === "s");
      }
    );
  });
};

// Crear la conexión principal
export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
});

// Intentar conectar y manejar la creación de la base de datos si es necesario
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (err) {
    // Verificar si el error es debido a que la base de datos no existe
    if (
      err.original &&
      (err.original.code === "ER_BAD_DB_ERROR" || // MySQL
        err.original.code === "3D000" || // PostgreSQL
        err.name === "SequelizeConnectionError")
    ) {
      console.error(`Base de datos '${database}' no encontrada.`);

      const shouldCreate = await askUser();

      if (shouldCreate) {
        const created = await createDatabase();

        if (created) {
          // Intentar conectar nuevamente
          try {
            await sequelize.authenticate();
            console.log(
              "Connection has been established successfully after database creation."
            );
            return true;
          } catch (reconnectErr) {
            console.error(
              "Failed to connect after database creation:",
              reconnectErr
            );
            return false;
          }
        }
      } else {
        console.log("Operación cancelada por el usuario.");
        // terminar proceso si el usuario no quiere crear la base de datos
        process.exit(0);
      }
    } else {
      console.error("Unable to connect to the database:", err);
      return false;
    }
  }
};

// Inicializar la conexión automáticamente
initializeDatabase();
