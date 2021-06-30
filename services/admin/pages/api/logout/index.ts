import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const logoutEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const acessToken: string = req.cookies?.access_token,
          loggedUser: string = req.cookies?.logged_user,
          loginPageURL: string = "/admin/dasboard/login";

    const isUserLoggedIn = (
        (
            acessToken &&
            loggedUser
        ) &&
        (
            acessToken.replace(/\s/g, '').length &&
            loggedUser.replace(/\s/g, '').length
        )
    );

    if(isUserLoggedIn){
        res.setHeader("Set-Cookie", [
            serialize("access_token", "", {
                maxAge: -1,
                path: "/"
            }),
            serialize("logged_user", "", {
                maxAge: -1,
                path: "/"
            })
        ]);

        res.writeHead(302, { Location: "/admin/logout"});
    };
   
    res.redirect(loginPageURL);

    res.end();
};

export default logoutEndpoint;