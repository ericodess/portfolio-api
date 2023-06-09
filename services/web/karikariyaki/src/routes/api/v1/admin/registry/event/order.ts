import { Router } from "express";
import QRCode from "qrcode";
import { QrCodeRseponse } from "karikarihelper";

// Services
import { OrderService, RequestService, ResponseService } from "@services";

// Models
import { OrderErrors } from "@models";

// Enums
import { OrderStatus } from "@enums";

const router = Router();

export enum RedirectorErrors {
    CLIENT_APP_ADDRESS_MISSING = "ERROR_CLIENT_APP_ADDRESS_MISSING",
}

router.get("/", (req, res) => {
    OrderService.query({
        id: RequestService.queryParamToString(req.query.id),
        eventId: RequestService.queryParamToString(req.query.eventId),
        status: RequestService.queryParamToString(req.query.status),
        operatorId: RequestService.queryParamToString(req.query.operatorId),
        clientName: RequestService.queryParamToString(req.query.clientName),
        itemsId: RequestService.queryParamToStrings(req.query.itemId),
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

router.get("/qr/:orderId", (req, res) => {
    if (!process.env["CLIENT_APP_ADDRESS"]) {
        res.status(500).json(
            ResponseService.generateFailedResponse(
                RedirectorErrors.CLIENT_APP_ADDRESS_MISSING
            )
        );

        return;
    }

    const orderId = req.params.orderId;

    if (!orderId) {
        res.status(400).json(
            ResponseService.generateFailedResponse(OrderErrors.INVALID)
        );

        return;
    }

    OrderService.queryById(orderId)
        .then((foundOrder) => {
            if (!foundOrder) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(
                        OrderErrors.NOT_FOUND
                    )
                );

                return;
            }

            const redirectorURI = `${process.env["CLIENT_APP_ADDRESS"]}/order/${foundOrder.id}`;

            QRCode.toDataURL(redirectorURI, {
                color: {
                    light: "#0000",
                },
                width: 512,
            })
                .then((result) => {
                    res.status(200).json(
                        ResponseService.generateSucessfulResponse({
                            base64: result,
                            redirector: redirectorURI,
                        } as QrCodeRseponse)
                    );
                })
                .catch((error) => {
                    ResponseService.generateFailedResponse(error.message);
                });
        })
        .catch((error) => {
            ResponseService.generateFailedResponse(error.message);
        });
});

router.post("/", (req, res) => {
    const eventId = RequestService.queryParamToString(req.body.eventId);
    const operatorId = RequestService.queryParamToString(req.body.operatorId);
    const clientName = RequestService.queryParamToString(req.body.clientName);
    const itemsId = RequestService.queryParamToStrings(req.body.itemsId);

    // Non obligatory params
    const status = RequestService.queryParamToString(req.body.status);

    if (
        !eventId ||
        !operatorId ||
        !clientName ||
        !itemsId ||
        itemsId.length === 0
    ) {
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
        itemsId: itemsId,
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
