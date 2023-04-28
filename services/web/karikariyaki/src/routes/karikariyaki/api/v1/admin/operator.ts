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

    OperatorService.query({
        userName: userName,
    })
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Operator not found")
                );

                return;
            }

            res.cookie("kk_yaki_token", JWTService.onSignUp(userName), {
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

export default router;
