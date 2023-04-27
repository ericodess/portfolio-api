import { Router } from "express";

// Services
import { RequestService, ResponseService, ProductService } from "@services";

const router = Router();

//TODO Implement JWT middleware
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

//TODO Implement JWT middleware
router.post("/", (req, res) => {
    const name = req.body.name;

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

//TODO Implement JWT middleware
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

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

//TODO Implement JWT middleware
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
