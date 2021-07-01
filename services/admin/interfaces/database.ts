import { Connection } from "mysql2/promise";

//Private Types
type QueryRequest = {
    [key: string]: string
};

//Public Types
export type ConnectionCallback = {
    (error: Error | null, connection?: Connection): Promise<void>
};

export interface IQuery {
    queryParameters: QueryRequest,
    queryItems: string,
    queryItemsPrefix: string,
    queryTable: string,
    isBinary?: boolean,
    isLimitless?: boolean,
    isPreciseComparison?: boolean
};