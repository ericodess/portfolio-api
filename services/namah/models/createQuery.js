//Service
const generateQuery = require('../services').generateQuery;

const getQuery = async (connection, {queryRequest, queryTargetItems, queryTargetTable, queryIsBinary}) => {
    const query = generateQuery({
        requestQueries: queryRequest,
        targetItems: queryTargetItems,
        targetTable: queryTargetTable,
        targetIsBinary: queryIsBinary
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