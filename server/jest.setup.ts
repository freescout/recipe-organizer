import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
if (process.env.NODE_ENV === "test") {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
}
