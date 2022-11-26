import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IGift {
    giftOnwer: string;
    giftCode: string;
    giftDescription: string;
}

export class Gift extends Model<IGift> {
    declare giftOnwer: string;
    declare giftCode: string;
    declare giftDescription: string;
}

Gift.init(
    {
        giftOnwer: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            primaryKey: true,
            unique: true,
            field: "gift_onwer",
        },
        giftCode: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "gift_code",
        },
        giftDescription: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "gift_description",
        },
    },
    {
        sequelize,
        tableName: "gifts",
        modelName: "gift",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
