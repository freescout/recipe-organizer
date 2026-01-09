import axios from "axios";
// Single source of truth for API URL
const getApiUrl = () => {
  // Server-side (Next.js server components, API routes)
  if (typeof window === "undefined") {
    return (
      process.env.API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "https://recipe-organizer.onrender.com/api"
    );
  }
  // Client-side (browser)
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    "https://recipe-organizer.onrender.com/api"
  );
};

// Create axios instance
export const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Get all public recipes
export const getAllRecipes = async () => {
  try {
    const res = await api.get("/recipes/public");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
    return [];
  }
};

// Get recipe by slug
export const getRecipeBySlug = async (slug: string) => {
  try {
    const res = await api.get(`/recipes/slug/${slug}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching recipe by slug:", err);
    return null;
  }
};
