import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createTask, updateTask } from "../controllers/task.controller";

const router = Router();

router.post("/:workspaceId", verifyJwt, createTask);
router.patch("/:taskId/:workspaceId", verifyJwt, updateTask);

export default router;
