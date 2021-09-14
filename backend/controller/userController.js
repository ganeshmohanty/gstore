import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import genrateToken from "../utils/genrateToken.js";

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
      token: genrateToken(user._id),
    });
  } else {
    res.status(401); // 401 - unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc       get user profile
// @route       GET /api/users/profile
// @access      private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        register a new user
// @route       GET /api/users/
// @access      public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //bad request
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    // 201 - successful creation
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400); //bad request
    throw new Error("Invalid user data");
  }
});

export { authUser, getUserProfile, registerUser };
