type IngredientListProps = {
  ingredients: string[];
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  if (!ingredients || ingredients.length === 0) return null;
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-800">
      {ingredients.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
