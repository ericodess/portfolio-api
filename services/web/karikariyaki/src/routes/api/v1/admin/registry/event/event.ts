import { Router } from "express";

// Services
import { EventService, RequestService, ResponseService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    EventService.query({
        id: RequestService.queryParamToString(req.query.id),
        name: RequestService.queryParamToString(req.query.name),
        date: RequestService.queryParamToDate(req.query.date),
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

    if (!name) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid event data")
        );

        return;
    }

    EventService.save({
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
    const name = req.body.name;

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid event data")
        );

        return;
    }

    EventService.update(id, { name: name })
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
            ResponseService.generateFailedResponse("Invalid event data")
        );

        return;
    }

    EventService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Event not found")
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
