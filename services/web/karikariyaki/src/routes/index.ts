import express, { Router } from "express";
import path from "path";

// Routes
import apiRouter from "./api";

const router = Router();

router.use(express.static(path.join(__dirname + "/admin/dist/admin")));

router.get("/admin", (req, res) =>
    res.sendFile(path.join(__dirname + "/admin/dist/admin/index.html"))
);
router.use("/api", apiRouter);

export default router;
