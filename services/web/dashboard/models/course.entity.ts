import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface ICourse {
    courseId: number;
    courseAuthor: string;
    courseTitle: string;
    courseDescription: string;
    courseStartDate: Date;
    courseEndDate: Date;
}

export class Course extends Model<ICourse> {
    declare courseId: number;
    declare courseAuthor: string;
    declare courseTitle: string;
    declare courseDescription: string;
    declare courseStartDate: Date;
    declare courseEndDate: Date;
}

Course.init(
    {
        courseId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "course_id",
        },
        courseAuthor: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            field: "course_author",
        },
        courseTitle: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "course_title",
        },
        courseDescription: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "course_description",
        },
        courseStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "course_start_date",
        },
        courseEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "course_end_date",
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
