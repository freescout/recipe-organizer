import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.TEST_DB_URI ||
  "mongodb://localhost:27017/recipe-organizer";

// Connect to MongoDB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}
