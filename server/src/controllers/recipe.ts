import { Request, Response } from "express";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
import { assertAuthenticated } from "../utils/assertAuthenticated";
import {
  getOwnedRecipeOrError,
  getUserOrError,
  isOwner,
} from "../utils/ownership";
import { handleError } from "../utils/handleError";
import User from "../models/User";
import { patchUserFromToken } from "../utils/patchUserFromToken";
import { assertNotNull } from "../utils/assert";

// Create a new recipe
export const createRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    assertAuthenticated(req);
    const recipeData = {
      ...req.body,
      user: req.user.id,
    };
    const newRecipe = new Recipe(recipeData);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    handleError(res, error, "creating recipe");
  }
};

// Get all recipes created by the authenticated user
export const getMyRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { ingredient } = req.query;
    const query: any = { user: userId };

    assertAuthenticated(req);

    if (ingredient) {
      query.ingredients = { $in: [ingredient] };
    }

    const recipes = await Recipe.find(query);
    res.status(200).json(recipes);
  } catch (error) {
    handleError(res, error, "fetching user recipes");
  }
};

// Get all public recipes
export const getPublicRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ingredient, tag } = req.query;

    const query: any = { isPublic: true };

    if (ingredient) {
      query.ingredients = { $regex: ingredient, $options: "i" };
    }
    if (tag) {
      query.tags = tag;
    }
    const recipes = await Recipe.find(query);
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No public recipes found" });
      return;
    }
    res.status(200).json(recipes);
  } catch (error) {
    handleError(res, error, "fetching public recipes");
  }
};

// Get a single recipe by slug
export const getRecipeBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    // Public recipe → always accessible
    if (recipe.isPublic) {
      res.status(200).json(recipe);
      return;
    }

    // Private recipe → requires auth
    if (!req.user) {
      patchUserFromToken(req);
    }

    if (!req.user || !isOwner(recipe, req)) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

    res.status(200).json(recipe);
  } catch (error) {
    handleError(res, error, "fetching recipe by slug");
  }
};

// Update an existing recipe
export const updateRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [recipe, error] = await getOwnedRecipeOrError(req, req.params.id);
    if (error) {
      res.status(error.status).json({ message: error.message });
      return;
    }

    const { servings } = req.body;
    if (servings !== undefined && servings <= 0) {
      res.status(400).json({ message: "Servings must be greater than zero" });
      return;
    }

    Object.assign(recipe, req.body);
    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    handleError(res, error, "updating recipe");
  }
};

// Delete a recipe
export const deleteRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [recipe, error] = await getOwnedRecipeOrError(req, req.params.id);
    if (error) {
      res.status(error.status).json({ message: error.message });
      return;
    }
    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting recipe");
  }
};

export const favoriteRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    assertAuthenticated(req);
    const [user, error] = await getUserOrError(req.user?.id);
    if (error) {
      res.status(error.status).json({ message: error.message });
      return;
    }

    assertNotNull(user, "User");
    const { id } = req.params;

    const recipeId = new mongoose.Types.ObjectId(id);

    if (!user.favoriteRecipes.some((r) => r.equals(recipeId))) {
      user.favoriteRecipes.push(recipeId);
      await user.save();
    }
    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    handleError(res, error, "favoriting recipe");
  }
};

export const unfavoriteRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    assertAuthenticated(req);

    const [user, error] = await getUserOrError(req.user?.id);
    const { id } = req.params;

    if (error) {
      res.status(error.status).json({ message: error.message });
      return;
    }

    assertNotNull(user, "User");

    user.favoriteRecipes = user.favoriteRecipes.filter(
      (recipeId) => recipeId.toString() != id
    );
    await user.save();
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    handleError(res, error, "unfavoring recipe");
  }
};

export const getFavoriteRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    assertAuthenticated(req);
    const userId = req.user?.id;
    const user = await User.findById(userId).populate("favoriteRecipes");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user?.favoriteRecipes);
  } catch (error) {
    handleError(res, error, "fetching favorite recipes");
  }
};
