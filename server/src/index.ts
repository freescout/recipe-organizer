import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/recipe-organizer";

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Organizer!");
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
