import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startswith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      throw new Error("Not authorised , token failed");
    }
  }
});

export { protect };
