"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { getAllRecipes } from "@/lib/api";
import RecipeSkeleton from "../components/RecipeSkeleton";
import RecipeCard from "../components/RecipeCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6"> All Recipes</h1>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <RecipeSkeleton key={i} />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-gray-500 text-center">No recipes found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
