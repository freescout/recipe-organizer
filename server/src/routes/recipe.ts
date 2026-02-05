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
  uploadRecipeImage,
} from "../controllers/recipe";
import { requireAuth } from "../middlewares/requireAuth";
import { upload } from "../middlewares/upload";

const router = express.Router();

// Public routes
router.get("/public", getPublicRecipes);
router.get("/slug/:slug", getRecipeBySlug);

// Protected routes (require JWT)
router.use(requireAuth);

// Image upload
router.post("/:id/image", upload.single("image"), uploadRecipeImage);

router.get("/favorites", getFavoriteRecipes);
router.post("/:id/favorite", favoriteRecipe);
router.delete("/:id/favorite", unfavoriteRecipe);

router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

router.get("/", getMyRecipes);
router.post("/", createRecipe);

export default router;
