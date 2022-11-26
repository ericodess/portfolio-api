import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IProduct {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productPriceCurrency: string;
}

export class Product extends Model<IProduct> {
    declare productId: number;
    declare productName: string;
    declare productDescription: string;
    declare productPrice: number;
    declare productPriceCurrency: string;
}

Product.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "product_id",
        },
        productName: {
            type: new DataTypes.STRING(45),
            allowNull: false,
            field: "product_name",
        },
        productDescription: {
            type: new DataTypes.STRING(255),
            allowNull: true,
            field: "product_description",
        },
        productPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: "product_price",
        },
        productPriceCurrency: {
            type: new DataTypes.STRING(10),
            allowNull: false,
            field: "product_price_currency",
        },
    },
    {
        sequelize,
        tableName: "products",
        modelName: "product",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
