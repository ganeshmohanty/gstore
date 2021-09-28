import express from "express";
import {
  getProducts,
  getProductsbyId,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controller/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductsbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
