import { Router } from "express";
import {
  createWorkspace,
  getAllWorkspace,
  getWorkspaceById,
} from "../controllers/workspace.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.post("/", verifyJwt, createWorkspace);
router.get("/", verifyJwt, getAllWorkspace);
router.get("/:id", verifyJwt, getWorkspaceById);

export default router;
