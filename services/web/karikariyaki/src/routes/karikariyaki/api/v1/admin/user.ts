import { Router } from "express";

// Types
import { Statics } from "@types";

// Models
import { OperatorModel } from "@models";

// Services
import { ResponseService, JWTService, DatabaseService } from "@services";

const router = Router();

router.post("/sign-up", (req, res) => {
    const userName: string = req.body.userName;
    const displayName: string = req.body.displayName;
    const photo: string = req.body.photo;

    if (
        !userName ||
        userName.trim().length < 1 ||
        !displayName ||
        displayName.trim().length < 1
    ) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid user data")
        );

        return;
    }

    DatabaseService.getConnection()
        .then(() => {
            const newUser = new OperatorModel();

            newUser.userName = userName;
            newUser.displayName = displayName;
            newUser.photo = Buffer.from(
                photo.trim().length > 1
                    ? photo
                    : Statics.DEFAULT_USER_PHOTO_BASE64,
                "base64"
            );

            newUser
                .save()
                .then(() => {
                    res.cookie("kk_yaki_token", JWTService.onSignUp(userName), {
                        httpOnly: true,
                        secure: true,
                    });

                    res.status(200).json(
                        ResponseService.generateSucessfulResponse({
                            loggedUser: userName,
                        })
                    );
                })
                .catch((error) => {
                    res.status(400).json(
                        ResponseService.generateFailedResponse(error.message)
                    );
                });
        })
        .catch(() => {
            res.status(500).json(
                ResponseService.generateFailedResponse(
                    "Error whilst trying to connect to the database"
                )
            );
        });
});

router.post("/sign-in", (req, res) => {
    const userName: string = req.body.userName;

    if (!userName || userName.trim().length < 1) {
        res.status(400).json(
            ResponseService.generateFailedResponse("Invalid user data")
        );

        return;
    }

    DatabaseService.getConnection()
        .then(() => {
            OperatorModel.findOne({
                userName: userName,
            })
                .then((entry) => {
                    if (!entry) {
                        res.status(404).json(
                            ResponseService.generateFailedResponse(
                                "User not found"
                            )
                        );

                        return;
                    }

                    res.cookie("kk_yaki_token", JWTService.onSignUp(userName), {
                        httpOnly: true,
                        secure: true,
                    });

                    res.status(200).json(
                        ResponseService.generateSucessfulResponse({
                            loggedUser: userName,
                        })
                    );
                })
                .catch((error) => {
                    res.status(400).json(
                        ResponseService.generateFailedResponse(error.message)
                    );
                });
        })
        .catch(() => {
            res.status(500).json(
                ResponseService.generateFailedResponse(
                    "Error whilst trying to connect to the database"
                )
            );
        });
});

export default router;
