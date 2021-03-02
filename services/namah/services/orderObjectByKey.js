const orderObjectByKey = (unorderedObject) => {
    return Object.keys(unorderedObject).sort().reduce(
        (obj, key) => { 
          obj[key] = unorderedObject[key]; 
          return obj;
        }, 
        {}
    );
};

module.exports = orderObjectByKey;