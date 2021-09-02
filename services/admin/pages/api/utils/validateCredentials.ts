import jwt from "jsonwebtoken";

//Types
import type {
	NextApiRequest,
	NextApiResponse
} from "next";

//Services
import { validatePage } from ".";

const validateCredentials = (
	req: NextApiRequest,
	res: NextApiResponse,
	isRedirection: boolean = true
): boolean => {
	const accessToken: string = req.cookies.access_token,
		  pageRootPath: string = "/admin",
		  logoutEndpointPath: string = "/service/auth/logout",
		  redirectPagePath: string = req.query?.redirect as string;

    let isAuthenticatedUser: boolean = false,
		error = {
			code: 500,
			description: "Server error please contact the administrator"
		};

    if(
        accessToken &&
        accessToken.replace(/\s/g, '').length
    ){
        if(
            process.env.SECRET &&
            accessToken.replace(/\s/g, '').length
        ){
            jwt.verify(
                accessToken,
                process.env.SECRET,
                (err) => {
                    if(!err){
                        isAuthenticatedUser = true;
                    }else{
						error.code = 403;
						error.description = `${err.name === "TokenExpiredError" ? "Expired" : "Invalid"} access_token please login again and try again`;
					};
                }
            );
        };
    }else{
		error.code = 400;
		error.description = "Missing access_token please login again and try again";
	};

	if(redirectPagePath){
		if(validatePage(redirectPagePath)){
			if(isAuthenticatedUser){
				res.redirect(`${pageRootPath}/${redirectPagePath}`);
			}else{
				res.redirect(`${pageRootPath}/${logoutEndpointPath}`);
			};
		};
	}else{
		if(isRedirection === false && isAuthenticatedUser === false){
			res.status(error.code).json({
				success: false,
				description: error.description
			});
		};
	};

    return isAuthenticatedUser;
};

export default validateCredentials;