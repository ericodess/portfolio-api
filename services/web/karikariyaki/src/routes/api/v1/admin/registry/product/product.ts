import { Router } from "express";

// Services
import { RequestService, ResponseService, ProductService } from "@services";
import { ProductErrors } from "@models";

const router = Router();

router.get("/", (req, res) => {
    ProductService.query({
        id: RequestService.queryParamToString(req.query.id),
        name: RequestService.queryParamToString(req.query.name),
        realmId: RequestService.queryParamToString(req.query.realmId),
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

router.post("/", (req, res) => {
    const name = RequestService.queryParamToString(req.body.name);
    const realmId = RequestService.queryParamToString(req.body.realmId);

    if (!name || !realmId) {
        res.status(400).json(
            ResponseService.generateFailedResponse(ProductErrors.INVALID)
        );

        return;
    }

    ProductService.save({
        name: name,
        realmId: realmId,
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

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const name = RequestService.queryParamToString(req.body.name);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(ProductErrors.INVALID)
        );

        return;
    }

    ProductService.update(id, { name: name })
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
    const id = req.params.id;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(ProductErrors.INVALID)
        );

        return;
    }

    ProductService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        ProductErrors.NOT_FOUND
                    )
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

export default router;
