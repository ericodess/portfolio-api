//Types
import type { NextApiRequest, NextApiResponse } from "next";
import type { IAuthResponse } from "../../../../interfaces/endpoint";

//Services
import { authCredentials } from "../../utils";

const authEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse<IAuthResponse>
) => {
    const accessToken: string = req.cookies?.access_token;

    if(accessToken){
        const isUserAuthenticated: boolean = authCredentials(accessToken);

        res.status(200).json({
            success: true,
            isUserAuthenticated: isUserAuthenticated
        });
    }else{
        res.status(401).json({
            success: false,
            isUserAuthenticated: false
        });
    };
};

export default authEndpoint;