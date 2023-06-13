import { Router } from "express";

// Services
import { RequestService, ResponseService, RealmService } from "@services";

// Models
import { RealmErrors } from "@models";

const router = Router();

router.get("/", (req, res) => {
    RealmService.query({
        id: RequestService.queryParamToString(req.query.id),
        name: RequestService.queryParamToString(req.query.name),
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

router.post("/", (req, res) => {
    const name = RequestService.queryParamToString(req.body.name);

    if (!name) {
        res.status(400).json(
            ResponseService.generateFailedResponse(RealmErrors.INVALID)
        );

        return;
    }

    RealmService.save({
        name: name,
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
    const id = req.params.id;
    const name = RequestService.queryParamToString(req.body.name);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(RealmErrors.INVALID)
        );

        return;
    }

    RealmService.update(id, { name: name })
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
    const id = req.params.id;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(RealmErrors.INVALID)
        );

        return;
    }

    RealmService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        RealmErrors.NOT_FOUND
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
