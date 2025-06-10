import { Request, Router } from "express";
import {
  createUser,
  fetchCurrentUser,
  getAllUsers,
  loginUser,
  logoutUser,
  searchUsers,
} from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.route("/").post(createUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(verifyJwt, logoutUser);
router.route("/auth/current_user").post(verifyJwt, fetchCurrentUser);
router.route("/").get(verifyJwt, getAllUsers);
router.route("/search").get(verifyJwt, searchUsers);
export default router;
