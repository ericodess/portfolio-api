import mongoose from "mongoose";

export class DatabaseService {
    private static _dbURI = `mongodb://${
        process.env.DATABASE_HOST.trim().length > 0 &&
        process.env.DATABASE_PORT.trim().length > 0 &&
        process.env.DATABASE_TABLE.trim().length > 0
            ? `${process.env.DATABASE_HOST.trim()}:${process.env.DATABASE_PORT.trim()}/${process.env.DATABASE_TABLE.trim()}`
            : "127.0.0.1:27017/portfolio_okonomiyator"
    }`;

    public static getConnection() {
        return mongoose.connect(DatabaseService._dbURI, {
            minPoolSize: Number(process.env.DATABASE_MIN_POOL_SIZE) ?? 5,
            maxPoolSize: Number(process.env.DATABASE_MAX_POOL_SIZE) ?? 15,
        });
    }

    public static generateCaseInsensivitySettings(value: string) {
        return {
            $regex: `^${value.trim().toLowerCase()}$`,
            $options: "i",
        };
    }
}
