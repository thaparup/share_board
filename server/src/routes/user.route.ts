import { Router } from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  searchUsers,
  validateToken,
} from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { uploadFile } from "../middleware/image.middleware";

const router = Router();
const allowedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
const maxFileSizeMB = 5;

router
  .route("/")
  .post(
    uploadFile(allowedExtensions, maxFileSizeMB).single("avatarImageFile"),
    createUser
  );
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(verifyJwt, logoutUser);
router.route("/auth/validate_token").post(verifyJwt, validateToken);
router.route("/").get(verifyJwt, getAllUsers);
router.route("/search").get(verifyJwt, searchUsers);
export default router;
