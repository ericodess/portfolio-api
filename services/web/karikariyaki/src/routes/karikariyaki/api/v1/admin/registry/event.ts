import { Router } from "express";

// Services
import { ResponseService } from "@services";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

router.post("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

router.patch("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

router.delete("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

export default router;
