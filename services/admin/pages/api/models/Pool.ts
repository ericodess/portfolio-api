import { createPool, PoolConnection } from 'mysql2/promise';

//Types
import type { ConnectionCallback } from '../interfaces/database';

const pool = createPool({
	connectionLimit: 10,
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
});

export const getConnection = async (callbackFunction: ConnectionCallback) => {
	try {
		const connection: PoolConnection = await pool.getConnection();

		await connection.ping();

		return await callbackFunction(null, connection);
	} catch (error) {
		return await callbackFunction(error);
	}
};
