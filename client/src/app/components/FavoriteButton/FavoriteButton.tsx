import { useState } from "react";

type FavoriteButtonProps = {
  initialIsFavorited: boolean;
  onToggle?: (isFavorited: boolean) => void;
};

export default function FavoriteButton({
  initialIsFavorited = false,
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isFavorited;
    setIsFavorited(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorited ? "Unfavorite" : "Favorite"}
      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 group"
    >
      <svg
        className={`w-5 h-5 transition-all duration-200 ${
          isFavorited
            ? "fill-red-500 stroke-red-500"
            : "fill-none stroke-gray-600 group-hover:stroke-red-500"
        }`}
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
