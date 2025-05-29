import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipe";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Organizer!");
});

setupSwagger(app);

export default app;
