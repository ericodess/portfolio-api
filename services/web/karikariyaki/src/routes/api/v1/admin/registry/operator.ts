import { Router } from "express";

// Services
import { OperatorService, RequestService, ResponseService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    OperatorService.query({
        id: RequestService.queryParamToString(req.query.id),
        userName: RequestService.queryParamToString(req.query.userName),
        displayName: RequestService.queryParamToString(req.query.displayName),
    })
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Operator not found")
                );

                return;
            }

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

router.patch("/:id", (req, res) => {
    const id = RequestService.queryParamToString(req.params.id);
    const displayName = RequestService.queryParamToString(req.body.displayName);
    const photo = RequestService.queryParamToString(req.body.photo);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid operator data")
        );

        return;
    }

    OperatorService.update(id, {
        displayName: displayName,
        photo: photo,
    })
        .then((response) => {
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

router.delete("/:id", (req, res) => {
    const id = RequestService.queryParamToString(req.params.id);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid operator data")
        );

        return;
    }

    OperatorService.delete(id)
        .then(() => {
            res.status(200).json(ResponseService.generateSucessfulResponse());
        })
        .catch((error) => {
            res.status(500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

export default router;
