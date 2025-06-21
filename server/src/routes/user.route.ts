import { NextFunction, Router, Request, Response } from "express";
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

// router
//   .route("/")
//   .post(
//     uploadFile(allowedExtensions, maxFileSizeMB).single("avatarImageFile"),
//     createUser
//   );

const uploader = uploadFile(allowedExtensions, maxFileSizeMB).single(
  "avatarImageFile"
);

const handleUploadErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploader(req, res, function (err) {
    if (err) {
      console.error("❌ Upload error:", err.message);
      return res.status(400).json({ message: err.message || "Upload failed" });
    }
    next();
  });
};
router.route("/").post(handleUploadErrors, createUser);

router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(verifyJwt, logoutUser);
router.route("/auth/validate_token").post(verifyJwt, validateToken);
router.route("/").get(verifyJwt, getAllUsers);
router.route("/search").get(verifyJwt, searchUsers);
export default router;
