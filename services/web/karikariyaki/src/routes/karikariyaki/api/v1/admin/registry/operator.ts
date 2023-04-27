import { Router } from "express";

// Services
import { ResponseService } from "@services";

const router = Router();

//TODO Implement JWT middleware
router.get("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

//TODO Implement JWT middleware
router.post("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

//TODO Implement JWT middleware
router.patch("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

//TODO Implement JWT middleware
router.delete("/", (req, res) => {
    res.status(200).json(ResponseService.generateSucessfulResponse());
});

export default router;
