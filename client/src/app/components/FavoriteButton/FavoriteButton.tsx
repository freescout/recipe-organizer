import { useState } from "react";

type FavoriteButtonProps = {
  initialIsFavorited: boolean;
  onToggle?: (isFavorited: boolean) => void;
};

export default function FavoriteButton({
  initialIsFavorited = false,
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorited, SetIsFavorited] = useState(initialIsFavorited);

  const toggleFavorite = () => {
    const newState = !isFavorited;
    SetIsFavorited(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorited ? "Unfavorite" : "Favorite"}
      className="text-red-500 hover:text-red-600 transition-colors text-xl"
    >
      {isFavorited ? "❤️" : "🤍"}
    </button>
  );
}
