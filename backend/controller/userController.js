import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

// @desc        Auth user & get token
// @route       GET /api/users/login
// @access      public

const authUser = asyncHandler(async (req, res) => {
  //get fdata from request body
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401); // 401 - unauthorized
    throw new Error("Invalid email or password");
  }
});

export { authUser };
