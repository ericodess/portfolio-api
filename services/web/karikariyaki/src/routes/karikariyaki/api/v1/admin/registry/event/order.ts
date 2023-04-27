import { Router } from "express";

// Services
import { OrderService, RequestService, ResponseService } from "@services";

// Enum
import { OrderStatus } from "@enum";

const router = Router();

//TODO Implement JWT middleware
router.get("/", (req, res) => {
    OrderService.query({
        id: RequestService.queryParamToString(req.query.id),
        event: RequestService.queryParamToString(req.query.event),
        status: RequestService.queryParamToString(req.query.status),
        operator: RequestService.queryParamToString(req.query.operator),
        client: RequestService.queryParamToString(req.query.client),
        item: RequestService.queryParamToString(req.query.item),
        variant: RequestService.queryParamToString(req.query.variant),
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
    const event = req.body.event;
    const operator = req.body.operator;
    const client = req.body.client;
    const item = req.body.item;

    // Non obligatory params
    const status = req.body.status;
    const variant = req.body.variant;

    if (!event || !operator || !client || !item) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.save({
        event: RequestService.queryParamToString(event),
        status: RequestService.queryParamToString(status),
        operator: RequestService.queryParamToString(operator),
        client: RequestService.queryParamToString(client),
        item: RequestService.queryParamToString(item),
        variant: RequestService.queryParamToString(variant),
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
    const status = req.body.status;
    const item = req.body.item;
    const variant = req.body.variant;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.update(id, {
        status: RequestService.queryParamToString(status),
        item: RequestService.queryParamToString(item),
        variant: RequestService.queryParamToString(variant),
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
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.delete(id)
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
