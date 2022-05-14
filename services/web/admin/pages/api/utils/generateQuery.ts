//Types
import type { IQuery } from '../interfaces/database';

const generateQuery = ({
	queryParameters,
	queryItems,
	queryTable,
	queryItemsPrefix = queryTable.slice(0, -1),
	isBinary = false,
	isLimitless = false,
	isPreciseComparison = false,
}: IQuery) => {
	let queryClauses = `SELECT ${
		queryItems === '' || queryItems === null || queryItems === undefined ? '*' : queryItems
	} FROM ${queryTable}`;
	const resultQueryParameters = [];

	if (Object.keys(queryParameters).length !== 0 && queryParameters.constructor === Object) {
		const firstIndex = Object.keys(queryParameters).indexOf(
			Object.keys(queryParameters).find(
				(element) => element !== 'limit' && queryParameters[element] !== undefined,
			)!,
		);

		Object.keys(queryParameters).map((element, index) => {
			if (element !== 'limit' && queryParameters[element] !== undefined) {
				const clausePrefix: string = `${index === firstIndex ? 'WHERE' : 'AND'}`,
					tableCurrentVariable: string = `${queryItemsPrefix}_${element}`,
					comparasionPrefix: string = `${isPreciseComparison ? 'LIKE' : '='}`,
					converterPrefix: string = `${isBinary ? 'BINARY ' : ''}`;

				queryClauses += ` ${clausePrefix} ${tableCurrentVariable} ${comparasionPrefix} ${converterPrefix}?`;

				if (element === 'id' && !isNaN(parseInt(queryParameters[element]))) {
					resultQueryParameters.push(parseInt(queryParameters[element]));
				} else {
					resultQueryParameters.push(queryParameters[element]);
				}
			}
		});

		if (!isLimitless) {
			queryClauses = queryClauses + ' LIMIT ?';

			if (!queryParameters['limit'] || parseInt(queryParameters['limit']) < 1) {
				resultQueryParameters.push(10);
			} else {
				resultQueryParameters.push(parseInt(queryParameters['limit']));
			}
		}
	}

	return { queryClauses, resultQueryParameters };
};

export default generateQuery;
