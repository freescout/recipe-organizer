import { generateToken } from "../src/utils/jwt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// 👇 Set correct secret for this script
dotenv.config({ path: path.join(__dirname, "../.env") });

const token = generateToken({
  id: "684c475048c20d02be2eea6a",
  email: "owner@example.com",
});

console.log("OWNER TOKEN:", token);
