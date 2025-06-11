import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  getPublicRecipes,
  getRecipeById,
  updateRecipe,
  getRecipeBySlug,
  favoriteRecipe,
  unfavoriteRecipe,
  getFavoriteRecipes,
} from "../controllers/recipe";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

// Public route
router.get("/public", getPublicRecipes);
router.get("/:id", getRecipeById);
router.get("/slug/:slug", getRecipeBySlug);

// Protected routes
router.use(requireAuth); // All routes below require a valid JWT

router.post("/", createRecipe);
router.get("/", getMyRecipes);

router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

router.post("/:id/favorite", favoriteRecipe);
router.delete(":id/favorite", unfavoriteRecipe);
router.get("/favorites", getFavoriteRecipes);

export default router;
