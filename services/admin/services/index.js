const generateQuery = ({requestQueries, targetItems, targetTable, targetIsBinary}) => {
    targetIsBinary = targetIsBinary === null || targetIsBinary === undefined ? false : targetIsBinary;

    let queryClauses = `SELECT ${targetItems === '' || targetItems === null || targetItems === undefined ? '*' : targetItems} FROM ${targetTable}`,
    queryParameters = [];

    if(Object.keys(requestQueries).length !== 0 && requestQueries.constructor === Object){
        const firstIndex = Object.keys(requestQueries).indexOf(Object.keys(requestQueries).find(element => element !== 'limit' && requestQueries[element] !== undefined));

        Object.keys(requestQueries).map((element, index) => {
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

exports.generateQuery = generateQuery;


const toCamelCase = (str) => {
    const map = {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    for(let pattern in map){
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str.replace(/([-_][a-z]|[A-Z]|)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/[^a-zA-Z]/g, '',/\s/g, '',/[0-9]/g,'');
};

exports.toCamelCase = toCamelCase;

const translateObjectKeys = (targetObject) => {
    let newObject = {};
    
    for(const [key, value] of Object.entries(targetObject)){
        if(value && typeof value === 'object' && typeof value.getMonth !== 'function'){
            newObject = {...newObject, [toCamelCase(key)]: translateObjectKeys(value)};
        }else{
            newObject = {...newObject, [toCamelCase(key)]: value}; 
        };
    };

    return newObject;
};

exports.translateObjectKeys = translateObjectKeys;

const translateObjectListKeys = (targetObjectList) => {
    const newObjectList = new Array(targetObjectList.length);

    targetObjectList.forEach((currentObject, index) => {
        newObjectList[index] = translateObjectKeys(currentObject);
    });

    return newObjectList;
};

exports.translateObjectListKeys = translateObjectListKeys;

const byteToGigabyte = (byteValue) => {
    return parseFloat((byteValue * (9.31 * 10 ** -10)).toFixed(1));
};

exports.byteToGigabyte = byteToGigabyte;

const getCpuUsage = async () => {
    const os = require('os');

    const cpuAverageUsageList = os.loadavg();

    if(cpuAverageUsageList[0] === 0){
        let usagePercentage = 0,
            initialTicks = 0,
            initialCPU,
            finalTicks = 0,
            finalCPU;

        initialCPU = os.cpus();

        await new Promise(resolve => setTimeout(resolve, 2000));

        finalCPU = os.cpus();

        for(let i = 0; i < finalCPU.length; i++) {
            const cpu = finalCPU[i],
                  pastCPU = initialCPU[i];
            
            for(const type in cpu.times) {
                initialTicks += pastCPU.times[type];
                finalTicks += cpu.times[type];
            };

            for(type in cpu.times) {
                if(type === 'system' || type === "user"){
                    usagePercentage += ((1000 * (cpu.times[type] - pastCPU.times[type]) / (finalTicks - initialTicks)) * 0.5);
                };
            }
        };

        return parseFloat((usagePercentage / finalCPU.length).toFixed(1));
    }else{
        const cpu = {
            cpuAverage1: cpuAverageUsageList[0],
            cpuAverage5: cpuAverageUsageList[1],
            cpuAverage15: cpuAverageUsageList[2],
            cores: Array.isArray(os.cpus()) ? os.cpus().length : null,
        };

        return Math.min(Math.floor(cpuAverage5 * 100 / cpu.cores), 100);
    }
};

exports.getCpuUsage = getCpuUsage;