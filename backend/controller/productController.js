import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc        fetch all the products
// @route       GET /api/products
// @access      public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      public

const getProductsbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

export { getProducts, getProductsbyId };
