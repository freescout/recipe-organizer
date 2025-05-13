import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/jwt";

const SECRET_KEY = process.env.SECRET_KEY || "secret_key";
const EXPIRATION_TIME = process.env.JWT_EXPIRES_IN || "1h";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = (await newUser.save()) as IUser;

    // Generate a JWT token
    const token = generateToken({
      id: savedUser._id.toString(),
      email: savedUser.email,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: "Invalid credentiels" });
      return;
    }

    const options: jwt.SignOptions = {
      expiresIn: EXPIRATION_TIME as any,
    };
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      options
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
