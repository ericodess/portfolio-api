import { serialize } from "cookie";

//Types
import type { NextApiRequest, NextApiResponse } from "next";

const logoutEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
	const fallbackPagePath: string = "/admin";

    res.setHeader("Set-Cookie", [
		serialize("access_token", "", {
			path: "/admin/service",
			maxAge: -1
		}),
		serialize("logged_user", "", {
			path: "/admin/service",
			maxAge: -1
		})
	]);

	res.redirect(fallbackPagePath);

    res.end();
};

export default logoutEndpoint;