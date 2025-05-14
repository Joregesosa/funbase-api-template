import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Users extends Model {}

Users.init(
  {
    id: {
      /**
       * Configuración del campo id: 🚀
       * - **type**: 'DataTypes.BIGINT.UNSIGNED' 🛠️
       *   - Utilizado para almacenar números enteros grandes. 📊
       *   - 'UNSIGNED' permite solo valores positivos. ➕
       *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
       * - **autoIncrement**: true 🔄
       *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
       * - **primaryKey**: true 🏷️
       *   - Define este campo como la clave primaria de la tabla. 🗂️
       */
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      get() {
        const value = this.getDataValue("status");
        return value ? "active" : "inactive";
      },
    } 
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
