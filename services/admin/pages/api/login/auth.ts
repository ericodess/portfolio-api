import type { NextApiRequest, NextApiResponse } from "next";

//Models
import IGeneralEndpoint from "../../../models/general-endpoint";

const authEndpoint = (
    req: NextApiRequest,
    res: NextApiResponse<IGeneralEndpoint>
) => {
    switch (req.method) {
        case "POST":
            res.status(200).json({
                success: true
            });

            break;

        default:
            res.status(405).json({
                success: true,
                description: 'Invalid method, please use POST'
            });

            res.end();

            break;
    }
};

export default authEndpoint;