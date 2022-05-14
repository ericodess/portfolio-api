//Services
import { sanitizeObjectKeys } from '.';

const sanitizeObjectListKeys = (targetObjectList: any) => {
	const newObjectList = new Array(targetObjectList.length);

	targetObjectList.forEach((currentObject: any, index: any) => {
		newObjectList[index] = sanitizeObjectKeys(currentObject);
	});

	return newObjectList;
};

export default sanitizeObjectListKeys;
