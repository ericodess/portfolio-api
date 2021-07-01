import { serialize } from "cookie";

//Types
import type { NextApiRequest, NextApiResponse } from "next";

const logoutEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    res.setHeader("Set-Cookie", [
        serialize("access_token", "", {
            maxAge: -1
        }),
        serialize("logged_user", "", {
            maxAge: -1
        })
    ]);

    res.redirect("/admin");

    res.end();
};

export default logoutEndpoint;