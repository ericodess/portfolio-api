import { Router } from "express";

import registryRouter from "./registry";
import userRouter from "./user";

const router = Router();

router.use("/registry", registryRouter);
router.use("/user", userRouter);

export default router;
