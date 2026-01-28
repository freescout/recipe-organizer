import { getRecipeBySlug } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center uppercase mb-2">
        {recipe.title}
      </h1>

      {/* Info grid */}
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

      {/* Image */}
      <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden">
        <Image
          src={recipe.imageUrl || "/images/placeholder.jpg"}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Ingredients */}
      <h2 className="text-2xl font-bold mb-3">Ingredients</h2>
      <ul className="list-disc list-inside mb-6 text-gray-800 leading-relaxed space-y-1">
        {recipe.ingredients.map(
          (
            ing: {
              item: string;
              quantity?: number;
              unit?: string;
            },
            index: number,
          ) => (
            <li key={`${index}-${ing.item}`}>
              {ing.quantity && `${ing.quantity} `}
              {ing.unit && `${ing.unit} `}
              {ing.item}
            </li>
          ),
        )}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-bold mb-3">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-800 leading-relaxed">
        {(Array.isArray(recipe.instructions)
          ? recipe.instructions
          : [recipe.instructions]
        ).map((step: string, index: number) => (
          <li key={`${index}-${step}`}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
