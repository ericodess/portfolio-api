import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IPost {
    postId: number;
    postTitle: string;
    postTheme: string;
    postAuthor: string;
}

export class Post extends Model<IPost> {
    declare postId: number;
    declare postTitle: string;
    declare postTheme: string;
    declare postAuthor: string;
}

Post.init(
    {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "post_id",
        },
        postTitle: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "post_title",
        },
        postTheme: {
            type: new DataTypes.STRING(25),
            allowNull: false,
            field: "post_theme",
        },
        postAuthor: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            field: "post_author",
        },
    },
    {
        sequelize,
        tableName: "posts",
        modelName: "post",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
