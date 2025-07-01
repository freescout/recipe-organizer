import Image from "next/image";
import RecipeMeta from "../RecipeMeta";

type RecipeDetailProps = {
  title: string;
  imageUrl?: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags?: string[];
};

export default function RecipeDetail({
  title,
  imageUrl,
  ingredients,
  instructions,
  prepTime,
  cookTime,
  servings,
  tags = [],
}: RecipeDetailProps) {
  return (
    <article className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      {imageUrl && (
        <div>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <RecipeMeta prepTime={prepTime} cookTime={cookTime} servings={servings} />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Instructions
        </h2>
        <p className="whitespace-pre-line text-gray-800">{instructions}</p>
      </section>
    </article>
  );
}
