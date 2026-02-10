import RecipeGrid from "../components/RecipeGrid";

export default function RecipesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">All Recipes</h1>

      <RecipeGrid />
    </main>
  );
}
