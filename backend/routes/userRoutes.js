import express from "express";

import { protect } from "../middlewares/authMiddleware";
import { authUser, getUserProfile } from "../controller/userController";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
