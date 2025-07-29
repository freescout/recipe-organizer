import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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
