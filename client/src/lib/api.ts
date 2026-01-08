import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_INTERNAL = process.env.API_INTERNAL_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllRecipes = async () => {
  try {
    const res = await api.get("/recipes/public");
    console.log("Recipes:", res.data);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch recipes", err);
    return [];
  }
};

export const getRecipeBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${API_INTERNAL}/recipes/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Recipe not found");
    const data = await res.json();
    console.log("Fetched single recipe", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch recipe by slug", err);
    return null;
  }
};
