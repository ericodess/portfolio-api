const generateQuery = ({requestQueries, targetItems, targetTable}) => {
    let queryClauses = `SELECT ${targetItems === '' || targetItems === null || targetItems === undefined ? '*' : targetItems} FROM ${targetTable}`,
    queryParameters = [];

    if(Object.keys(requestQueries).length !== 0 && requestQueries.constructor === Object){
        const firstIndex = Object.keys(requestQueries).indexOf(Object.keys(requestQueries).find(element => element !== 'limit'));

        Object.keys(requestQueries).map((element, index) => {
            if(element !== 'limit'){
                if(index === firstIndex){
                    queryClauses = queryClauses + ` WHERE ${targetTable.slice(0, -1)}_${element} = ?`;
                }else{
                    queryClauses = queryClauses + ` AND course_${element} = ?`;
                }

                if(element === 'author'){
                    queryParameters.push(requestQueries[element]);
                }else{
                    queryParameters.push(parseInt(requestQueries[element]));
                }
            }
        });

        queryClauses = queryClauses + ` LIMIT ?`;

        if(!requestQueries['limit'] || parseInt(requestQueries['limit']) < 1 ){
            queryParameters.push(10);
        }else{
            queryParameters.push(parseInt(requestQueries['limit']));
        }
    }

    return {queryClauses, queryParameters};
};

module.exports = generateQuery;