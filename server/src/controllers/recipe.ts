import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import { assertAuthenticated } from "../utils/assertAuthenticated";
import { isOwner } from "../utils/ownership";
import { handleError } from "../utils/handleError";

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
    assertAuthenticated(req);
    const recipes = await Recipe.find({ user: req.user.id });
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
    const recipes = await Recipe.find({ isPublic: true });
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No public recipes found" });
      return;
    }
    res.status(200).json(recipes);
  } catch (error) {
    handleError(res, error, "fetching public recipes");
  }
};

// Get a single recipe by ID
export const getRecipeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    // Check if the recipe is public or belongs to the authenticated user
    if (!recipe.isPublic && !isOwner(recipe, req)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    // If the recipe is public or belongs to the user, return it
    res.status(200).json(recipe);
  } catch (error) {
    handleError(res, error, "fetching recipe");
  }
};

// Update an existing recipe
export const updateRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    assertAuthenticated(req);
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    // Check if the recipe belongs to the authenticated user
    if (!isOwner(recipe, req)) {
      res.status(403).json({ message: "Access denied" });
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
    assertAuthenticated(req);
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    // Check if the recipe belongs to the authenticated user
    if (!isOwner(recipe, req)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting recipe");
  }
};
