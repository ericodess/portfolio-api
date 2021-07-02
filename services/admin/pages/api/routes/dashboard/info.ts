//Types
import type {
	NextApiRequest,
	NextApiResponse
} from "next";
import type {
	IGeneralResponse,
	IDashboardInfoResponse
} from "../../../../interfaces/endpoint";

//Models
import { getConnection } from "../../models/Pool";
import { getQuery } from "../../models/Query";

//Services
import {
	validateCredentials,
	getCPUUsage,
	getMemoryUsage
} from "../../utils";

const dashboardInfoEndpoint = async (
    req: NextApiRequest,
    res: NextApiResponse<IGeneralResponse | IDashboardInfoResponse>
): Promise<void>  => {
	const isUserAuthenticated: boolean = validateCredentials(req, res);

	if(isUserAuthenticated){
		if(req.query.q){
			const dashboardInfoQuery: string | string[] = req.query.q;
			
			if(dashboardInfoQuery === "table-status"){
				await getConnection(async (error, connection) => {
					if(!error && connection){
						await getQuery(connection, {
							queryParameters: {
								schema: process.env.DATABASE_NAME!
							},
							queryItems: "table_name",
							queryItemsPrefix: "table",
							queryTable: "information_schema.tables",
							isBinary: false,
							isLimitless: true,
							isPreciseComparison: false
						})
						.then(([rows, ]) => Object.values(rows))
						.then(result => {
							const tableList: string[] = [];

							result.forEach(currentTable => {
								tableList.push(currentTable.table_name);
							});

							res.status(200).json({
								success: true,
								databaseStatus: {
									tableList: tableList
								}
							});
						})
						.catch(() => {
							res.status(500).json({
								success: false,
								description: 'Server error, please try again'
							});
						})
					}else{
						res.status(500).json({
							success: false,
							description: "Database error, please try again"
						});
					};
				})
			}else{
				if(dashboardInfoQuery === "system-status"){
					res.status(200).json({
						success: true,
						systemStatus: {
							cpu: {
								usedPercentage: await getCPUUsage()
							},
							memory: getMemoryUsage()
						}
					});
				}else{
					res.status(200).json({
						success: false,
						description: "Invalid query value"
					});
				};
			};
		}else if(Object.entries(req.query).length > 0){
			res.status(200).json({
				success: false,
				description: "Invalid query parameter"
			});
		}else{
			res.status(200).json({
				success: false,
				description: "Missing query parameter"
			});
		};
	};

	res.end();
};

export default dashboardInfoEndpoint;