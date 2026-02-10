// app/page.tsx

import RecipeGrid from "./components/RecipeGrid";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-8 pb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
            Simple, wholesome recipes
          </h2>

          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Browse public recipes or sign in to save your favorites.
          </p>
        </section>

        {/* Recipes */}
        <section className="pb-16">
          <RecipeGrid />
        </section>
      </main>
    </>
  );
}
