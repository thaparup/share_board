import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import {
  createTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.post("/:workspaceId", verifyJwt, createTask);
router.get("/:workspaceId", verifyJwt, getAllTasks);
router.patch("/:taskId/:workspaceId", verifyJwt, updateTask);

export default router;
