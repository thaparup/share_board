import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import {
  addMember,
  existingMemberOnTheWorkspace,
} from "../controllers/member.controller";

const router = Router();

router.post("/:workspaceId", verifyJwt, addMember);
router.get("/:workspaceId", verifyJwt, existingMemberOnTheWorkspace);

export default router;
