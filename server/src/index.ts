import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = parseInt(process.env.PORT || "7000", 10);

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.TEST_DB_URI ||
  "mongodb://localhost:27017/recipe-organizer";

// Connect to MongoDB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log(
        "Connecting to:",
        MONGO_URI.includes("mongodb+srv") ? "MongoDB Atlas" : "Local Mongo"
      );

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}
