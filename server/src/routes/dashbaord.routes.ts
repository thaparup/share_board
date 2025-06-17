import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { stats } from "../controllers/dashboard.controller";

const router = Router();

router.get("/stats", verifyJwt, stats);

export default router;
