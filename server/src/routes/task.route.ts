import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createTask } from "../controllers/task.controller";

const router = Router();

router.post("/:workspaceId", verifyJwt, createTask);

export default router;
