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

            JWTService.saveCookies(res, userName);

            res.status(200).json(
                ResponseService.generateSucessfulResponse(response)
            );
        })
        .catch((error) => {
            res.status(error.code ?? 500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

router.get("/sign-out", (req, res) => {
    JWTService.clearCookies(req, res);

    res.status(200).json(ResponseService.generateSucessfulResponse());
});

export default router;
