import { Sequelize } from "sequelize";
import config from "#config/index.js";

const { database, password, port, host, user, dialect } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
