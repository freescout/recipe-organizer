"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { getAllRecipes } from "@/lib/api";
import RecipeSkeleton from "./RecipeSkeleton";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid() {
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

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <RecipeSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return <p className="text-gray-500 text-center">No recipes found</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
