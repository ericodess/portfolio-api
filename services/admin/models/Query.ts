import { Connection } from "mysql2/promise";

//Services
import { generateQuery } from "../services";

//Interfaces
import { IQuery } from "../interfaces/database";

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