import { getRecipeBySlug } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipeBySlug(params.slug);
  if (!recipe) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center uppercase mb-2">
        {recipe.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 text-center border-y py-4 mb-6">
        <div>
          <div className="text-sm text-gray-500 uppercase">Serves</div>
          <div className="font-semibold">{recipe.servings} servings</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 uppercase">Prep Time</div>
          <div className="font-semibold">{recipe.prepTime} mins</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 uppercase">Cook Time</div>
          <div className="font-semibold">{recipe.cookTime} mins</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 uppercase">Total Time</div>
          <div className="font-semibold">
            {recipe.prepTime + recipe.cookTime} mins
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden">
        <Image
          src={recipe.imageUrl || "/images/placeholder.jpg"}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h2 className="text-2xl font-bold mb-3">Ingredients</h2>
      <ul className="list-disc list-inside mb-6 text-gray-800 leading-relaxed">
        {recipe.ingredients.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-3">Instructions</h2>
      <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>
    </div>
  );
}
