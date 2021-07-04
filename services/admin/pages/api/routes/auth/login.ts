import jwt from "jsonwebtoken";
import { serialize } from "cookie";

//Types
import type { NextApiRequest, NextApiResponse } from "next";
import type { IGeneralResponse } from "../../../../interfaces/endpoint";

//Models
import { getConnection } from "../../models/Pool";

//Service
import { getQuery } from "../../models/Query";

const loginEndpoint = async (
    req: NextApiRequest,
    res: NextApiResponse<IGeneralResponse>
) => {
    switch (req.method) {
        case "POST":
            await getConnection(async (error, connection) => {
                if(!error && connection){
                    await getQuery(connection, {
                        queryParameters: {
                            email: req.body.email,
                            password: req.body.password
                        },
                        queryItems: "user_name,user_is_admin",
                        queryItemsPrefix: "user",
                        queryTable: "users",
                        isBinary: true,
                        isLimitless: true
                    })
                    .then(([rows, ]) => Object.values(rows))
                    .then(results => {
                        if(results.length === 0){
                            res.status(401).json({
                                success: false,
                                description: 'Invalid username or password'
                            });
                        }else{
                            if(results[0].user_is_admin === 1){
                                const userName = results[0].user_name;

                                const accessToken = jwt.sign(
                                    {userName},
                                    process.env.SECRET as string,
                                    {
                                        expiresIn: 1800
                                    }
                                );

                                res.setHeader(
                                    'Set-Cookie',
                                    [
                                        serialize(
                                            'access_token',
                                            accessToken,
                                            {
                                                httpOnly: true, 
                                                secure: true,
                                                sameSite: "strict",
												path: "/admin/service"
                                            }
                                        ),
                                        serialize(
                                            'logged_user',
                                            userName,
                                            {
                                                secure: true,
                                                sameSite: "strict",
												path: "/admin"
                                            }
                                        )
                                    ]
                                );

                                res.status(200).json({
                                    success: true
                                });
                            }else{
                                res.status(403).json({
                                    success: false,
                                    description: 'This user doesn`t have access to this realm'
                                });
                            };
                        };
                    })
                }else{
                    res.status(500).json({
                        success: false,
                        description: "Server error, please try again"
                    });
                };
            });

            res.end();

            break;

        default:
            res.status(405).json({
                success: true,
                description: 'Invalid method, please use POST'
            });

            res.end();

            break;
    };
};

export default loginEndpoint;