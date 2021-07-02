//Services
import { toCamelCase } from ".";

const sanitizeObjectKeys = (targetObject: any) => {
	let sanitizedObject = {};

	for(const [key, value] of Object.entries(targetObject)){
        if(
			value &&
			typeof value === 'object'
		){
            sanitizedObject = {...sanitizedObject, [toCamelCase(key)]: sanitizeObjectKeys(value)};
        }else{
            sanitizedObject = {...sanitizedObject, [toCamelCase(key)]: value}; 
        };
    };
};

export default sanitizeObjectKeys;