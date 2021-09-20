import express from "express";
import { addOrderItems } from "../controller/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);

export default router;
