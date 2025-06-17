import { generateToken } from "../src/utils/jwt";
import mongoose from "mongoose";

// 👇 Set correct secret for this script
process.env.JWT_SECRET = "supersecretkey";

const token = generateToken({
  id: "684c475048c20d02be2eea6a",
  email: "owner@example.com",
});

console.log("OWNER TOKEN:", token);
