import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Register Controller
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the field",
        success: false,
        error: true,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false, error: true });
    }

    const user = new userModel({
      name,
      email,
      password,
    });

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Error in registration", success: false, error: true });
  }
};

//Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false, error: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false, error: true });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      error: false,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Error logging in", success: false, error: true });
  }
};
