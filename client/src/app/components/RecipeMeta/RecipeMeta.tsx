type RecipeMetaProps = {
  prepTime: number;
  cookTime: number;
  servings: number;
};

export default function RecipeMeta({
  prepTime,
  cookTime,
  servings,
}: RecipeMetaProps) {
  return (
    <p className="text-sm text-gray-500 mt-1">
      ⏱️ {prepTime + cookTime} min &middot; 🍽 {servings} servings
    </p>
  );
}
