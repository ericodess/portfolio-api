import { Router } from "express";

// Routes
import eventRouter from "./event";
import operatorRouter from "./operator";
import productRouter from "./product";

const router = Router();

router.use("/event", eventRouter);
router.use("/operator", operatorRouter);
router.use("/product", productRouter);

export default router;
