import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import {
  createTask,
  getAllAssignedTask,
  getAllTasks,
  getAllTaskWhereTheUserIsAdmin,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/assigned", verifyJwt, getAllAssignedTask);
router.post("/:workspaceId", verifyJwt, createTask);
router.get("/:workspaceId", verifyJwt, getAllTasks);
router.patch("/:workspaceId/:taskId", verifyJwt, updateTask);
router.get("/:workspaceId/:taskId", verifyJwt, getTaskById);
router.get("", verifyJwt, getAllTaskWhereTheUserIsAdmin);

export default router;
