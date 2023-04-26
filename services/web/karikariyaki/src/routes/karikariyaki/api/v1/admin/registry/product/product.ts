import { Router } from "express";

// Services
import {
    RequestService,
    ResponseService,
    ProductService,
    StringService,
} from "@services";

const router = Router();

router.get("/", (req, res) => {
    ProductService.query({
        id: RequestService.isValidQueryParam(req.query.id)
            ? (req.query.id as string)?.trim()
            : null,
        name: RequestService.isValidQueryParam(req.query.name)
            ? (req.query.name as string)?.trim()
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
    const variantIds = req.body.variantIds;

    if (!name) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid product data")
        );

        return;
    }

    ProductService.save({
        name: name,
        variants: variantIds
            ? StringService.toObjectIds(variantIds as string[]) ?? []
            : [],
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
    const name = req.body.name;
    const variantIds = req.body.variantIds;
    const willAppendVariantIds = req.query.willAppendVariantIds;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid product data")
        );

        return;
    }

    ProductService.update(
        id,
        { name: name, variants: variantIds },
        RequestService.isValidQueryParam(willAppendVariantIds)
            ? StringService.toBoolean(willAppendVariantIds as string)
            : null
    )
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
