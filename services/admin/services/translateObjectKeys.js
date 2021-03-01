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

module.exports = translateObjectKeys;