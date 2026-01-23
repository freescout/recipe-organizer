import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

// Suppress console logs in tests
if (process.env.NODE_ENV === "test") {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
}

// Connect to test database before all tests
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.TEST_DB_URI!);
  } catch (error) {
    console.error("Failed to connect to test DB:", error);
    throw error;
  }
  await mongoose.connect(process.env.TEST_DB_URI!);
}, 10000);

// Clean up and disconnect after all tests
afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error("Cleanup error:", error);
  }
}, 10000);

// Clear all collections after each test
/* afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}); */
