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
    <div className="flex items-center gap-5 mt-2 text-sm text-gray-600">
      {/* Time */}
      <div className="flex items-center gap-1.5">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <span className="font-medium">{prepTime + cookTime} min</span>
      </div>

      {/* Servings */}
      <div className="flex items-center gap-1.5">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="font-medium">{servings} servings</span>
      </div>
    </div>
  );
}
