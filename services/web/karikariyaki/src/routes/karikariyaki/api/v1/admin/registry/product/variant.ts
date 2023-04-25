import { Router } from "express";

// Services
import { RequestService, ResponseService, VariantService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    VariantService.query({
        id: RequestService.isValidQueryParam(req.query.id)
            ? (req.query.id as string)?.trim()
            : null,
        name: RequestService.isValidQueryParam(req.query.name)
            ? (req.query.name as string)?.trim()
            : null,
        product: RequestService.isValidQueryParam(req.query.productId)
            ? (req.query.productId as string)?.trim()
            : null,
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
    const name = req.body.name;
    const productId = req.body.productId;

    if (!name || !productId) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid variant data")
        );

        return;
    }

    VariantService.save({ name: name, product: productId })
        .then(() => {
            res.status(200).json(ResponseService.generateSucessfulResponse());
        })
        .catch((error) => {
            res.status(500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const productId = req.body.productId;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid variant data")
        );

        return;
    }

    VariantService.update(id, { name: name, product: productId })
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
            ResponseService.generateFailedResponse("Invalid variant data")
        );

        return;
    }

    VariantService.delete(id)
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