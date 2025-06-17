import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  getPublicRecipes,
  updateRecipe,
  getRecipeBySlug,
  favoriteRecipe,
  unfavoriteRecipe,
  getFavoriteRecipes,
} from "../controllers/recipe";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

// Public routes
router.get("/public", getPublicRecipes);
router.get("/slug/:slug", getRecipeBySlug);

// Protected routes (require JWT)
router.use(requireAuth);

router.get("/favorites", getFavoriteRecipes);
router.post("/:id/favorite", favoriteRecipe);
router.delete("/:id/favorite", unfavoriteRecipe);

router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

router.get("/", getMyRecipes);
router.post("/", createRecipe);

export default router;
