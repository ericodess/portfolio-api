const getQuery = async (connection,query,queryParams) => {
    return new Promise((resolve, reject) => {
        connection.query(query, queryParams, (error,result) => {
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    })
};

module.exports = getQuery;