import { Router } from "express";
import { Operator } from "karikarihelper";

// Services
import {
    JWTService,
    OperatorService,
    RequestService,
    ResponseService,
} from "@services";

// Models
import { OperatorErrors } from "@models";

const router = Router();

router.get("/", (req, res) => {
    OperatorService.query(res.locals.operator as Operator, {
        id: RequestService.queryParamToString(req.query.id),
        realmId: RequestService.queryParamToString(req.query.realmId),
        displayName: RequestService.queryParamToString(req.query.displayName),
    })
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        OperatorErrors.NOT_FOUND
                    )
                );

                return;
            }

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

router.get("/self", async (req, res) => {
    try {
        const decodedAccessToken = JWTService.decodeAccessToken(
            req.cookies[process.env.COOKIE_NAME]
        );

        const foundOperator = await OperatorService.queryByUserName(
            decodedAccessToken.userName
        );

        if (!foundOperator) {
            res.status(404).json(
                ResponseService.generateFailedResponse(OperatorErrors.NOT_FOUND)
            );

            return;
        }

        res.status(200).json(
            ResponseService.generateSucessfulResponse(foundOperator)
        );
    } catch (error) {
        res.status(error.code ?? 500).json(
            ResponseService.generateFailedResponse(error.message)
        );
    }
});

router.post("/", (req, res) => {
    const userName = RequestService.queryParamToString(req.body.userName);
    const displayName = RequestService.queryParamToString(req.body.displayName);
    const realmId = RequestService.queryParamToString(req.body.realmId);
    const photo = RequestService.queryParamToString(req.body.photo);

    if (!userName || !displayName || !realmId) {
        res.status(400).json(
            ResponseService.generateFailedResponse(OperatorErrors.INVALID)
        );

        return;
    }

    OperatorService.save(res.locals.operator as Operator, {
        userName: userName,
        displayName: displayName,
        realmId: realmId,
        photo: photo,
    })
        .then((response) => {
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

router.patch("/:id", (req, res) => {
    const id = RequestService.queryParamToString(req.params.id);
    const displayName = RequestService.queryParamToString(req.body.displayName);
    const photo = RequestService.queryParamToString(req.body.photo);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(OperatorErrors.INVALID)
        );

        return;
    }

    OperatorService.update(res.locals.operator as Operator, id, {
        displayName: displayName,
        photo: photo,
    })
        .then((response) => {
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

router.delete("/:id", (req, res) => {
    const id = RequestService.queryParamToString(req.params.id);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(OperatorErrors.INVALID)
        );

        return;
    }

    OperatorService.delete(res.locals.operator as Operator, id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        OperatorErrors.NOT_FOUND
                    )
                );

                return;
            }

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

export default router;
