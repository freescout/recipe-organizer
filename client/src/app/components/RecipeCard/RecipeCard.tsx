import Image from "next/image";
import RecipeMeta from "../RecipeMeta";
import FavoriteButton from "../FavoriteButton";

type RecipeCardProps = {
  title: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags?: string[];
};

export default function RecipeCard({
  title,
  imageUrl,
  prepTime,
  cookTime,
  servings,
  tags,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={false}
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <FavoriteButton initialIsFavorited={false} />
        <RecipeMeta
          prepTime={prepTime}
          cookTime={cookTime}
          servings={servings}
        />
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="tex-xs bg-amber-100 tex-amber-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
