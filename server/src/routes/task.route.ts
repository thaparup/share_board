import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.post("/:workspaceId", verifyJwt, createTask);
router.get("/:workspaceId", verifyJwt, getAllTasks);
router.patch("/:workspaceId/:taskId", verifyJwt, updateTask);
router.get("/:workspaceId/:taskId", verifyJwt, getTaskById);

export default router;
