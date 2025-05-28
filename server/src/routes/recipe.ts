import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  getPublicRecipes,
  getRecipeById,
  updateRecipe,
  getRecipeBySlug,
} from "../controllers/recipe";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

// Public route
router.get("/public", getPublicRecipes);
router.get("/slug/:slug", getRecipeBySlug);

// Protected routes
router.use(requireAuth); // All routes below require a valid JWT

router.post("/", createRecipe);
router.get("/", getMyRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
