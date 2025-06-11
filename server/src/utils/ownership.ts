import { Request } from "express";
import Recipe, { IRecipe } from "../models/Recipe";
import { assertAuthenticated } from "./assertAuthenticated";
import User, { IUserDocument } from "../models/User";

export function isOwner(recipe: IRecipe, req: Request): boolean {
  return recipe.user.toString() === req.user?.id;
}

export const getOwnedRecipeOrError = async (
  req: Request,
  recipeId: string
): Promise<[any | null, { status: number; message: string } | null]> => {
  assertAuthenticated(req);
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return [null, { status: 404, message: "Recope not found" }];
  }

  if (!isOwner(recipe, req)) {
    return [null, { status: 403, message: "Access denied" }];
  }
  return [recipe, null];
};

export const getUserOrError = async (
  userId: string
): Promise<
  [IUserDocument | null, { status: number; message: string } | null]
> => {
  if (!userId) {
    return [null, { status: 401, message: "User ID missing" }];
  }

  const user = await User.findById(userId);
  if (!user) {
    return [null, { status: 404, message: "User not found" }];
  }
  return [user, null];
};
