import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IApiKey {
    apiKeyId: string;
    apiKeyValue: string;
    apiKeyOrigin: string;
}

export class ApiKey extends Model<IApiKey> {
    declare apiKeyId: string;
    declare apiKeyValue: string;
    declare apiKeyOrigin: string;
}

ApiKey.init(
    {
        apiKeyId: {
            type: new DataTypes.STRING(45),
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true,
            field: "api_key_id",
        },
        apiKeyValue: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "api_key_value",
        },
        apiKeyOrigin: {
            type: new DataTypes.STRING(45),
            allowNull: false,
            field: "api_key_origin",
        },
    },
    {
        sequelize,
        tableName: "api_keys",
        modelName: "api_key",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
