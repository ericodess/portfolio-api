import { Router } from "express";

// Services
import { RequestService, ResponseService, VariantService } from "@services";

const router = Router();

//TODO Implement JWT middleware
router.get("/", (req, res) => {
    VariantService.query({
        id: RequestService.queryParamToString(req.query.id),
        name: RequestService.queryParamToString(req.query.name),
        product: RequestService.queryParamToString(req.query.productId),
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

//TODO Implement JWT middleware
router.post("/", (req, res) => {
    const name = RequestService.queryParamToString(req.body.name);
    const productId = RequestService.queryParamToString(req.body.productId);

    if (!name || !productId) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid variant data")
        );

        return;
    }

    VariantService.save({
        name: name,
        product: productId,
    })
        .then(() => {
            res.status(200).json(ResponseService.generateSucessfulResponse());
        })
        .catch((error) => {
            res.status(500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

//TODO Implement JWT middleware
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const name = RequestService.queryParamToString(req.body.name);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid variant data")
        );

        return;
    }

    VariantService.update(id, { name: name })
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

//TODO Implement JWT middleware
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
