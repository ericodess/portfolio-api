//Service
const generateQuery = require('../services').generateQuery;

const getQuery = async (connection, {queryRequest, queryTargetItems, queryTargetItemsPrefix, queryTargetTable, queryIsBinary, queryIsLimitless}) => {
    const query = generateQuery({
        requestQueries: queryRequest,
        targetItems: queryTargetItems,
        targetItemsPrefix: queryTargetItemsPrefix,
        targetTable: queryTargetTable,
        isBinary: queryIsBinary,
        isLimitless: queryIsLimitless
    });

    return new Promise((resolve, reject) => {
        connection.query(query.queryClauses, query.queryParameters, (error,result) => {
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    })
};

module.exports = getQuery;