import { Router } from "express";

// Routes
import karikariyakiRouter from "./karikariyaki";

const router = Router();

router.use("/karikariyaki", karikariyakiRouter);

export default router;
