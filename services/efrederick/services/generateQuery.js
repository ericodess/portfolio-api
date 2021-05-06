const generateQuery = ({requestQueries, targetItems, targetItemsPrefix, targetTable, isBinary, isLimitless, isPreciseComparison}) => {
    targetItemsPrefix = targetItemsPrefix ?? targetTable.slice(0, -1);
    isBinary = isBinary ?? false;
    isLimitless = isLimitless ?? false;
    isPreciseComparison = isPreciseComparison ?? true;

    let queryClauses = `SELECT ${targetItems === '' || targetItems === null || targetItems === undefined ? '*' : targetItems} FROM ${targetTable}`,
        queryParameters = [];

    if(Object.keys(requestQueries).length !== 0 && requestQueries.constructor === Object){
        const firstIndex = Object.keys(requestQueries).indexOf(Object.keys(requestQueries).find(element => element !== 'limit' && requestQueries[element] !== undefined));

        Object.keys(requestQueries).map((element, index) => {
            if(element !== 'limit' && requestQueries[element] !== undefined){
               const clausePrefix = `${index === firstIndex ? 'WHERE' : 'AND'}`,
                     tableCurrentVariable = `${targetItemsPrefix}_${element}`,
                     comparasionPrefix = `${isPreciseComparison ? 'LIKE' : '='}`,
                     converterPrefix = `${isBinary ? 'BINARY ' : ''}`;

                queryClauses += ` ${clausePrefix} ${tableCurrentVariable} ${comparasionPrefix} ${converterPrefix}?`;

                if(element === 'id' && !isNaN(parseInt(requestQueries[element]))){
                    queryParameters.push(parseInt(requestQueries[element]));
                }else{
                    queryParameters.push(requestQueries[element]);
                };
            };
        });

        if(!isLimitless){
            queryClauses = queryClauses + ' LIMIT ?';

            if(!requestQueries['limit'] || parseInt(requestQueries['limit']) < 1 ){
                queryParameters.push(10);
            }else{
                queryParameters.push(parseInt(requestQueries['limit']));
            };
        };
    };
    
    return {queryClauses, queryParameters};
};

module.exports = generateQuery;