import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IUser {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    userIsAdmin: boolean;
}

export class User extends Model<IUser> {
    declare userId: number;
    declare userName: string;
    declare userEmail: string;
    declare userPassword: string;
    declare userIsAdmin: boolean;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "user_id",
        },
        userName: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            field: "user_name",
        },
        userEmail: {
            type: new DataTypes.STRING(320),
            allowNull: false,
            field: "user_email",
        },
        userPassword: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "user_password",
        },
        userIsAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "user_is_admin",
        },
    },
    {
        sequelize,
        tableName: "users",
        modelName: "user",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
