import { Router } from "express";

// Services
import {
    MenuService,
    RequestService,
    ResponseService,
    StringService,
} from "@services";

// Models
import { MenuErrors } from "@models";

const router = Router();

router.get("/", (req, res) => {
    MenuService.query({
        realm: "INSIDE",
    })
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
    const realm = StringService.toMenuRealm(
        RequestService.queryParamToString(req.body.realm)
    );
    const title = RequestService.queryParamToString(req.body.title);
    const route = RequestService.queryParamToString(req.body.route);
    const parentId = RequestService.queryParamToString(req.body.parentId);

    if (!title || !realm) {
        res.status(400).json(
            ResponseService.generateFailedResponse(MenuErrors.INVALID)
        );

        return;
    }

    MenuService.save({
        realm: realm,
        title: title,
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
    const realm = StringService.toMenuRealm(
        RequestService.queryParamToString(req.body.realm)
    );
    const title = RequestService.queryParamToString(req.body.title);
    const route = RequestService.queryParamToString(req.body.route);

    if (!id) {
        res.status(400).json(
            ResponseService.generateFailedResponse(MenuErrors.INVALID)
        );

        return;
    }

    MenuService.update(id, { realm: realm, title: title, route: route })
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
