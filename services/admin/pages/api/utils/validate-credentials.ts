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
	res: NextApiResponse
): boolean => {
	const accessToken: string = req.cookies.access_token,
		  pageRootPath: string = "/admin",
		  logoutEndpointPath: string = "/admin/service/logout",
		  redirectPagePath: string = req.query?.redirect as string;

    let isAuthenticatedUser: boolean = false;

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
                    };
                }
            );
        };
    };

	if(redirectPagePath && validatePage(redirectPagePath)){
		if(isAuthenticatedUser){
			res.redirect(`${pageRootPath}/${redirectPagePath}`);
		}else{
			res.redirect(logoutEndpointPath);
		};
	};

    return isAuthenticatedUser;
};

export default validateCredentials;