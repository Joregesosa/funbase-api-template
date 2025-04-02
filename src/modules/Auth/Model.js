import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Auth extends Model {}

Auth.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // add your columns here
    },
    {
        sequelize,
        modelName: "auth",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
