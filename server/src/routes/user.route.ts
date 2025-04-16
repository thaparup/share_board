import { Request, Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.route("/").post(createUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(verifyJwt, logoutUser);
export default router;
