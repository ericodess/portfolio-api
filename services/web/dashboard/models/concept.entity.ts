import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IConcept {
    conceptId: number;
    conceptLikeCount: number;
}

export class Concept extends Model<IConcept> {
    declare conceptId: number;
    declare conceptLikeCount: number;
}

Concept.init(
    {
        conceptId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "concept_id",
        },
        conceptLikeCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "concept_like_count",
        },
    },
    {
        sequelize,
        tableName: "concepts",
        modelName: "concept",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
