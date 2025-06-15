import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import {
  createTask,
  deleteTask,
  getAllAssignedTask,
  getAllTasks,
  getAllTaskWhereTheUserIsAdmin,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.delete("/:taskId", verifyJwt, deleteTask); // ✅ Put this first
router.get("/assigned", verifyJwt, getAllAssignedTask);
router.get("", verifyJwt, getAllTaskWhereTheUserIsAdmin);
router.post("/:workspaceId", verifyJwt, createTask);
router.get("/:workspaceId", verifyJwt, getAllTasks);
router.get("/:workspaceId/:taskId", verifyJwt, getTaskById);
router.patch("/:workspaceId/:taskId", verifyJwt, updateTask);

export default router;
