import { Connection } from "mysql2/promise";

//Types
import type { IQuery } from "../interfaces/database";

//Services
import { generateQuery } from "../utils";

export const getQuery = async (
    connection: Connection,
    {
        queryParameters,
        queryItems,
        queryTable,
        queryItemsPrefix,
        isBinary,
        isLimitless,
        isPreciseComparison
    }: IQuery
) => {
    const query = generateQuery({
        queryParameters,
        queryItems,
        queryItemsPrefix,
        queryTable,
        isBinary,
        isLimitless,
        isPreciseComparison
    });

    return await connection.query(query.queryClauses, query.resultQueryParameters);
};