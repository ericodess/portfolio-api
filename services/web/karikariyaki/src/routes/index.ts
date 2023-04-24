import { Router } from "express";

// Routes
import karikariyakiEndpoint from "./karikariyaki";

const router = Router();

router.use("/karikariyaki", karikariyakiEndpoint);

export default router;
