import type { NextApiRequest, NextApiResponse } from "next";

//Services
import { authCredentials } from "../../../services";

//Models
import IGeneralEndpoint from "../../../models/general-endpoint";

const loginEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse<IGeneralEndpoint>
) => {
    const acessToken = req.cookies?.access_token,
          loginPageURL = "/admin/dashboard/login",
          dashboardPageURL = "/admin/dashboard";

    const isUserAuthenticated: boolean = authCredentials(acessToken);

    if(isUserAuthenticated){
        res.redirect(dashboardPageURL);

        res.end();
    }else{
        res.redirect(loginPageURL);

        res.end();
    };
};

export default loginEndpoint;