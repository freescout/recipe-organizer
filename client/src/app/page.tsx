// app/page.tsx

import RecipeGrid from "./components/RecipeGrid";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-4 pb-3 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 leading-tight">
            Simple, wholesome recipes
          </h2>

          <p className="mt-1 text-gray-600 max-w-xl mx-auto">
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
