// scripts/seed-user.ts
import mongoose from "mongoose";
import User from "../src/models/User";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI!);
  const existing = await User.findOne({ email: "owner@example.com" });

  if (existing) {
    console.log("USER ALREADY EXISTS:", existing._id.toString());
  } else {
    const user = await User.create({
      name: "Owner",
      email: "owner@example.com",
      password: "hashed-password", // or dummy value
    });
    console.log("USER created with ID:", user._id.toString());
  }

  await mongoose.disconnect();
}

main();
