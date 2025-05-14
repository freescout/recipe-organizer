import { Request } from "express";
import { IRecipe } from "../models/Recipe";

export function isOwner(recipe: IRecipe, req: Request): boolean {
  return recipe.user.toString() === req.user?.id;
}
