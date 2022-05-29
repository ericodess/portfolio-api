const generateQuery = ({requestQueries, targetItems, targetTable, targetIsBinary}) => {
    targetIsBinary = targetIsBinary === null || targetIsBinary === undefined ? false : targetIsBinary;

    let queryClauses = `SELECT ${targetItems === '' || targetItems === null || targetItems === undefined ? '*' : targetItems} FROM ${targetTable}`,
    queryParameters = [];

    if(Object.keys(requestQueries).length !== 0 && requestQueries.constructor === Object){
        const firstIndex = Object.keys(requestQueries).indexOf(Object.keys(requestQueries).find(element => element !== 'limit' && requestQueries[element] !== undefined));

        Object.keys(requestQueries).map((element, index) => {
            if(element === 'q'){             
                for(const [targetItemKey, targetItemValue] of Object.entries(targetItems)){
                    if(targetItemKey === '0'){
                        queryClauses = queryClauses + ` WHERE ${targetItemValue} LIKE CONCAT('%', ?, '%')`;
                    }else{
                        queryClauses = queryClauses + ` OR ${targetItemValue} LIKE CONCAT('%', ?, '%')`;
                    }

                    queryParameters.push(requestQueries[element]);
                }
            }else{
                if(element !== 'limit' && requestQueries[element] !== undefined){
                    if(index === firstIndex){
                        queryClauses = queryClauses + ` WHERE ${targetTable.slice(0, -1)}_${element} LIKE ${targetIsBinary ? 'BINARY ' : ''}?`;
                    }else{
                        queryClauses = queryClauses + ` AND ${targetTable.slice(0, -1)}_${element} LIKE ${targetIsBinary ? 'BINARY ' : ''}?`;
                    }
    
                    if(element === 'id' && !isNaN(parseInt(requestQueries[element]))){
                        queryParameters.push(parseInt(requestQueries[element]));
                    }else{
                        queryParameters.push(requestQueries[element]);
                    }
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