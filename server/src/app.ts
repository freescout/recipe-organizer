import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipe";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3001", // frontend dev server
      "https://recipe-organizer-client.vercel.app",
      "https://recipe-organizer-client-git-main-freescouts-projects.vercel.app",
      "https://recipe-organizer.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Organizer!");
});

setupSwagger(app);

export default app;
