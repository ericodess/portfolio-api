import { Router } from "express";

import registryRouter from "./registry";
import operatorRouter from "./operator";

const router = Router();

router.use("/registry", registryRouter);
router.use("/operator", operatorRouter);

export default router;
