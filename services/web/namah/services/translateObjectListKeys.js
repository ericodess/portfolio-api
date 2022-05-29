//Services
const translateObjectKeys = require('.').translateObjectKeys;

const translateObjectListKeys = (targetObjectList) => {
    const newObjectList = new Array(targetObjectList.length);

    targetObjectList.forEach((currentObject, index) => {
        newObjectList[index] = translateObjectKeys(currentObject);
    });

    return newObjectList;
};

module.exports = translateObjectListKeys;