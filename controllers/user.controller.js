import asyncHandler from "express-async-handler";
import { User } from "../mongodb/models/user.js";
import { generateToken } from "../utils/tokenGeneration.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists!");
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    if (user) {
      res.status(201);
      res.send({
        success: true,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.send({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.send({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, loginUser, getUserById };
