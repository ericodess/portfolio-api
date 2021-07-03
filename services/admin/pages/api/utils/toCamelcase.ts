//Types
import type { ISpecialCaracter } from "../interfaces/util";

const getPatternMap = (): ISpecialCaracter => {
	return {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
};

const toCamelCase = (text: string): string => {
	const patternMap = getPatternMap();

	let sanitizedText: string = text;

	for(const pattern in patternMap){
		sanitizedText = text.replace(new RegExp(patternMap[pattern], "g"), pattern);
	};

	return sanitizedText.replace(/([-_][a-z]|[A-Z]|)/g, (word, index) => {
		return index === 0 ? word.toLocaleLowerCase() : word.toLocaleUpperCase();
	}).replace(/[^a-zA-Z][\s][0-9]/g, '');
};

export default toCamelCase;