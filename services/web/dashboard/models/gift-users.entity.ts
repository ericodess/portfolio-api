import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IUserGift {
    userId: number;
    userName: string;
    userLogin: string;
    userPassword: string;
}

export class UserGift extends Model<IUserGift> {
    declare userId: number;
    declare userName: string;
    declare userLogin: string;
    declare userPassword: string;
}

UserGift.init(
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
        userLogin: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            field: "user_login",
        },
        userPassword: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "user_password",
        },
    },
    {
        sequelize,
        tableName: "gift_users",
        modelName: "gifts-users",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
