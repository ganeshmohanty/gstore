import express from "express";
import {
  createProduct,
  getProducts,
  getProductsbyId,
  deleteProduct,
  updateProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

//router.get('/', getProducts)

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductsbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
