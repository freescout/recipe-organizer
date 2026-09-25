import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./db";

const PORT = parseInt(process.env.PORT || "7000", 10);
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.TEST_DB_URI ||
  "mongodb://localhost:27017/recipe-organizer";

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

if (process.env.NODE_ENV !== "test") {
  connectDB(MONGO_URI);
}
