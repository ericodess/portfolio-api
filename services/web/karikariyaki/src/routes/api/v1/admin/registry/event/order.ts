import { Router } from "express";

// Services
import { OrderService, RequestService, ResponseService } from "@services";

// Models
import { OrderErrors } from "@models";

// Enums
import { OrderStatus } from "@enums";

const router = Router();

router.get("/", (req, res) => {
    OrderService.query({
        id: RequestService.queryParamToString(req.query.id),
        eventId: RequestService.queryParamToString(req.query.eventId),
        status: RequestService.queryParamToString(req.query.status),
        operatorId: RequestService.queryParamToString(req.query.operatorId),
        clientName: RequestService.queryParamToString(req.query.clientName),
        itemId: RequestService.queryParamToString(req.query.itemId),
        variantId: RequestService.queryParamToString(req.query.variantId),
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

router.get("/status", (req, res) => {
    res.status(200).json(
        ResponseService.generateSucessfulResponse(Object.values(OrderStatus))
    );
});

router.post("/", (req, res) => {
    const eventId = RequestService.queryParamToString(req.body.eventId);
    const operatorId = RequestService.queryParamToString(req.body.operatorId);
    const clientName = RequestService.queryParamToString(req.body.clientName);
    const itemId = RequestService.queryParamToString(req.body.itemId);

    // Non obligatory params
    const status = RequestService.queryParamToString(req.body.status);
    const variantId = RequestService.queryParamToString(req.body.variantId);

    if (!eventId || !operatorId || !clientName || !itemId) {
        res.status(400).json(
            ResponseService.generateFailedResponse(OrderErrors.INVALID)
        );

        return;
    }

    OrderService.save({
        eventId: eventId,
        status: status,
        operatorId: operatorId,
        clientName: clientName,
        itemId: itemId,
        variantId: variantId,
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
            ResponseService.generateFailedResponse(OrderErrors.INVALID)
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
            ResponseService.generateFailedResponse(OrderErrors.INVALID)
        );

        return;
    }

    OrderService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        OrderErrors.NOT_FOUND
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