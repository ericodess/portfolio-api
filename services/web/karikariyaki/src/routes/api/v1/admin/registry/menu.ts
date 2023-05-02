import { Router } from "express";

// Services
import { MenuService, RequestService, ResponseService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    MenuService.query({
        id: RequestService.queryParamToString(req.query.id),
        route: RequestService.queryParamToString(req.query.route),
        parentId: RequestService.queryParamToString(req.query.parentId),
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
    const route = RequestService.queryParamToString(req.body.route);
    const parentId = RequestService.queryParamToString(req.body.parentId);

    if (!route) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid menu data")
        );

        return;
    }

    MenuService.save({
        route: route,
        parentId: parentId,
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
    const route = RequestService.queryParamToString(req.body.route);

    if (!id || !route) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid menu data")
        );

        return;
    }

    MenuService.update(id, { route: route })
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
            ResponseService.generateFailedResponse("Invalid menu data")
        );

        return;
    }

    MenuService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse("Menu not found")
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
