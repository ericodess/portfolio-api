import { Router } from "express";

// Services
import {
    ResponseService,
    JWTService,
    RequestService,
    OperatorService,
} from "@services";

const router = Router();

router.post("/sign-up", (req, res) => {
    const userName = RequestService.queryParamToString(req.body.userName);
    const displayName = RequestService.queryParamToString(req.body.displayName);
    const photo = RequestService.queryParamToString(req.body.photo);

    if (!userName || !displayName) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid operator data")
        );

        return;
    }

    OperatorService.save({
        userName: userName,
        displayName: displayName,
        photo: photo,
    })
        .then((response) => {
            res.cookie(process.env.COOKIE_NAME, JWTService.onSignIn(userName), {
                httpOnly: true,
                secure: true,
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

            res.cookie(process.env.COOKIE_NAME, JWTService.onSignIn(userName), {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                expires: JWTService.getExpirationTimeInDate(),
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

router.get("/sign-out", (req, res) => {
    const accessToken = RequestService.queryParamToString(
        req.cookies[process.env.COOKIE_NAME]
    );

    if (!accessToken) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid access token")
        );

        return;
    }

    res.clearCookie(process.env.COOKIE_NAME);

    res.status(200).json(ResponseService.generateSucessfulResponse());
});

router.get("/refresh", (req, res) => {
    const accessToken = RequestService.queryParamToString(
        req.cookies[process.env.COOKIE_NAME]
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
