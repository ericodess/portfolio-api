import { Router } from "express";

// Routes
import productRouter from "./product";
import variantRouter from "./variant";

const router = Router();

router.use("/", productRouter);
router.use("/variant", variantRouter);

export default router;
