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
  updateTaskTodo,
} from "../controllers/task.controller";

const router = Router();

router.patch("/todo/", verifyJwt, updateTaskTodo);
router.delete("/:taskId", verifyJwt, deleteTask);
router.get("/assigned", verifyJwt, getAllAssignedTask);
router.get("", verifyJwt, getAllTaskWhereTheUserIsAdmin);
router.post("/:workspaceId", verifyJwt, createTask);
router.get("/:workspaceId", verifyJwt, getAllTasks);
router.get("/:workspaceId/:taskId", verifyJwt, getTaskById);
router.patch("/:workspaceId/:taskId", verifyJwt, updateTask);

export default router;
