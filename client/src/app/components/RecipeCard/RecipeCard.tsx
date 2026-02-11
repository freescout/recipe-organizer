import Image from "next/image";
import RecipeMeta from "../RecipeMeta";
import FavoriteButton from "../FavoriteButton";
import { Recipe } from "@/types";
import { useState } from "react";
import Link from "next/link";
import { getTagStyle } from "@/lib/tagStyles";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const {
    title,
    imageUrl,
    prepTime = 0,
    cookTime = 0,
    servings = 1,
    tags = [],
  } = recipe;
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative w-full aspect-[4/3]">
          {imageUrl && (
            <Image
              src={imgError ? "/images/placeholder.jpg" : imageUrl}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 400px"
              priority={false}
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="p-3">
          <h2 className="mt-3 text-lg font-serif font-medium text-gray-900 leading-snug">
            {title}
          </h2>
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
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getTagStyle(tag)}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
