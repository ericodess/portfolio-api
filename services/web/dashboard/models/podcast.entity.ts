import { DataTypes, Model } from "sequelize";

// Connection
import sequelize from "./connection";

interface IPodcast {
    podcastId: number;
    podcastTitle: string;
    podcastAuthor: string;
    podcastDescription: string;
}

export class Podcast extends Model<IPodcast> {
    declare podcastId: number;
    declare podcastTitle: string;
    declare podcastAuthor: string;
    declare podcastDescription: string;
}

Podcast.init(
    {
        podcastId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "podcast_id",
        },
        podcastTitle: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "podcast_title",
        },
        podcastAuthor: {
            type: new DataTypes.STRING(35),
            allowNull: false,
            field: "podcast_author",
        },
        podcastDescription: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            field: "podcast_description",
        },
    },
    {
        sequelize,
        tableName: "podcasts",
        modelName: "podcast",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
