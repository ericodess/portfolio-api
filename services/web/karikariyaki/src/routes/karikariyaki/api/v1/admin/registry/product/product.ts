import { Router } from "express";

// Services
import { RequestService, ResponseService, ProductService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    ProductService.query({
        id: RequestService.queryParamToString(req.query.id),
        name: RequestService.queryParamToString(req.query.name),
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

    if (!name) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid product data")
        );

        return;
    }

    ProductService.save({
        name: name,
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

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const name = RequestService.queryParamToString(req.body.name);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid product data")
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
            ResponseService.generateFailedResponse("Invalid product data")
        );

        return;
    }

    ProductService.delete(id)
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
