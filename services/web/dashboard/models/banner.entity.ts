import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IBanner {
    bannerId: number;
    bannerTitle: string;
    bannerDescription: string;
}

export class Banner extends Model<IBanner> {
    declare bannerId: number;
    declare bannerTitle: string;
    declare bannerDescription: string;
}

Banner.init(
    {
        bannerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "banner_id",
        },
        bannerTitle: {
            type: new DataTypes.STRING(45),
            allowNull: false,
            field: "banner_title",
        },
        bannerDescription: {
            type: new DataTypes.STRING(45),
            allowNull: false,
            field: "banner_description",
        },
    },
    {
        sequelize,
        tableName: "banners",
        modelName: "banner",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
