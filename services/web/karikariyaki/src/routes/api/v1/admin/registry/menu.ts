import { Router } from "express";
import { Operator } from "karikarihelper";

// Services
import { MenuService, RequestService, ResponseService } from "@services";

// Models
import { MenuErrors } from "@models";

const router = Router();

router.get("/", (req, res) => {
    const id = RequestService.queryParamToString(req.query.id);
    const title = RequestService.queryParamToString(req.query.title);
    const parentId = RequestService.queryParamToString(req.query.parentId);
    const isRootOnly = RequestService.queryParamToBoolean(req.query.isRootOnly);

    MenuService.query(
        res.locals.operator as Operator,
        {
            id: id,
            title: title,
            parentId: parentId,
        },
        isRootOnly ?? false
    )
        .then((response) => {
            res.status(200).json(
                ResponseService.generateSucessfulResponse(response)
            );
        })
        .catch((error) => {
            res.status(error.code ?? 500).json(
                ResponseService.generateFailedResponse(error.message)
            );
        });
});

router.post("/", (req, res) => {
    const title = RequestService.queryParamToString(req.body.title);
    const icon = RequestService.queryParamToString(req.body.icon);
    const route = RequestService.queryParamToString(req.body.route);
    const parentId = RequestService.queryParamToString(req.body.parentId);

    if (!title) {
        res.status(400).json(
            ResponseService.generateFailedResponse(MenuErrors.INVALID)
        );

        return;
    }

    MenuService.save({
        title: title,
        icon: icon,
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
    const icon = RequestService.queryParamToString(req.body.icon);
    const title = RequestService.queryParamToString(req.body.title);
    const route = RequestService.queryParamToString(req.body.route);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(MenuErrors.INVALID)
        );

        return;
    }

    MenuService.update(id, {
        icon: icon,
        title: title,
        route: route,
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
            ResponseService.generateFailedResponse(MenuErrors.INVALID)
        );

        return;
    }

    MenuService.delete(id)
        .then((response) => {
            if (!response) {
                res.status(404).json(
                    ResponseService.generateFailedResponse(MenuErrors.NOT_FOUND)
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
