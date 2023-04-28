import { Router } from "express";

// Types
import { InHouseError } from "@types";

// Services
import {
    JWTService,
    OperatorService,
    RequestService,
    ResponseService,
} from "@services";

// Routes
import registryRouter from "./registry";
import operatorRouter from "./operator";

const router = Router();

router.use(
    "/registry",
    async (req, res, next) => {
        try {
            const decoded = JWTService.onVerification(
                req.cookies[process.env.COOKIE_NAME]
            );

            const foundOperator = await OperatorService.queryByUserName(
                RequestService.queryParamToString(decoded)
            );

            if (!foundOperator) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Operator not found")
                );

                return;
            }

            next();
        } catch (error) {
            if (error instanceof InHouseError) {
                res.status(error.code).json(
                    ResponseService.generateFailedResponse(error.message)
                );

                return;
            }

            res.status(500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        }
    },
    registryRouter
);
router.use("/operator", operatorRouter);

export default router;
