import { Sequelize } from "sequelize";
import config from "#config/index.js";

const { database, password, port, host, user, dialect } = config.db;
const aditional = {
  host,
  dialect,
  port,
};

if (dialect === "postgres") {
  aditional.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export const sequelize = new Sequelize(database, user, password, {
  ...aditional,
});
