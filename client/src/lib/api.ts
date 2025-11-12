import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://server:7000/api"
    : process.env.NEXT_PUBLIC_API_URL;

console.log("API base URL:", process.env.NEXT_PUBLIC_API_URL);

export const getAllRecipes = async () => {
  try {
    const res = await api.get("/recipes/public");
    console.log("Recipes:", res.data);
    if (Array.isArray(res.data)) return res.data;
    return [];
  } catch (err) {
    console.error("Failed to fetch recipes", err);
    return [];
  }
};

export const getRecipeBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${API_BASE}/recipes/slug/${slug}`, {
      cache: "no-store", // Optional: disables ISR caching in dev
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
