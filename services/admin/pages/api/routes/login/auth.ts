//Types
import type { NextApiRequest, NextApiResponse } from "next";
import type { IAuthResponse } from "../../../../interfaces/endpoint";

//Services
import { validateCredentials } from "../../utils";

const authEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse<IAuthResponse>
) => {
    const isUserAuthenticated: boolean = validateCredentials(req, res),
		  redirectPage: string = req.query?.redirect as string;

	if(!redirectPage){
		res.status(200).json({
			success: true,
			isUserAuthenticated: isUserAuthenticated
		});
	};

	res.end();
};

export default authEndpoint;