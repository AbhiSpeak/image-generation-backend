import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserById,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(protect, getUserById);

export default router;
