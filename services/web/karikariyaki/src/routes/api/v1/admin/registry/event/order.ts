import { Router } from "express";

// Services
import { OrderService, RequestService, ResponseService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    OrderService.query({
        id: RequestService.queryParamToString(req.query.id),
        event: RequestService.queryParamToString(req.query.eventId),
        status: RequestService.queryParamToString(req.query.status),
        operator: RequestService.queryParamToString(req.query.operatorId),
        client: RequestService.queryParamToString(req.query.clientName),
        item: RequestService.queryParamToString(req.query.itemId),
        variant: RequestService.queryParamToString(req.query.variantId),
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
    const event = RequestService.queryParamToString(req.body.eventId);
    const operator = RequestService.queryParamToString(req.body.operatorId);
    const client = RequestService.queryParamToString(req.body.clientName);
    const item = RequestService.queryParamToString(req.body.itemId);

    // Non obligatory params
    const status = RequestService.queryParamToString(req.body.status);
    const variant = RequestService.queryParamToString(req.body.variantId);

    if (!event || !operator || !client || !item) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.save({
        event: event,
        status: status,
        operator: operator,
        client: client,
        item: item,
        variant: variant,
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
    const status = RequestService.queryParamToString(req.body.status);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.update(id, {
        status: status,
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
    const id = req.params.id;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid order data")
        );

        return;
    }

    OrderService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Order not found")
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
