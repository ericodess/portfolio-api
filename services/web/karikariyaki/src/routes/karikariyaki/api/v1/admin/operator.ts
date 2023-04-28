import { Router } from "express";

// Services
import {
    ResponseService,
    JWTService,
    RequestService,
    OperatorService,
} from "@services";

const router = Router();

router.post("/sign-in", (req, res) => {
    const userName = RequestService.queryParamToString(req.body.userName);

    if (!userName) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid operator data")
        );

        return;
    }

    OperatorService.queryByUserName(userName)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Operator not found")
                );

                return;
            }

            res.cookie("kk_yaki_token", JWTService.onSignIn(userName), {
                httpOnly: true,
                sameSite: "lax",
                secure: true,
                expires: new Date(
                    Date.now() +
                        JWTService.getExpirationTimeInMs() * 24 * 60 * 60 * 1000
                ),
            });

            res.status(200).json(
                ResponseService.generateSucessfulResponse(response)
            );
        })
        .catch((error) => {
            res.status(500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

router.post("/refresh", (req, res) => {
    const accessToken = RequestService.queryParamToString(
        req.cookies.kk_yaki_token
    );

    if (!accessToken) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid access token")
        );

        return;
    }

    res.status(200).json(
        ResponseService.generateSucessfulResponse(accessToken)
    );
});

export default router;
