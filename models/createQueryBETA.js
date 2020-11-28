//Service
const generateQuery = require('../services/generateQuery');

const getQuery = async (connection, {queryRequest, queryTargetItems, queryTargetTable}) => {
    const query = generateQuery({
        requestQueries: queryRequest,
        targetItems: queryTargetItems,
        targetTable: queryTargetTable
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