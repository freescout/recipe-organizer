import { useForm } from "react-hook-form";

type RecipeFormValues = {
  title: string;
  ingredients: string[];
  ingredientInput?: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  tagInput?: string;
};

type RecipeFormProps = {
  onSubmit: (
    data: Omit<RecipeFormValues, "IngredientInput" | "tagInput">
  ) => void;
  initialData?: Partial<Omit<RecipeFormValues, "IngredientInput" | "tagInput">>;
};

export default function RecipeForm({
  onSubmit,
  initialData = {},
}: RecipeFormProps) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<RecipeFormValues>({
      defaultValues: {
        ...initialData,
        ingredients: initialData.ingredients || [],
        tags: initialData.tags || [],
        ingredientInput: "",
        tagInput: "",
      },
    });

  const addItem = (
    field: "ingredients" | "tags",
    inputField: "ingredientInput" | "tagInput"
  ) => {
    const items = getValues(field);
    const input = (getValues(inputField) ?? "").trim();
    if (!input) return;
    setValue(field, [...items, input]);
    setValue(inputField, "");
  };

  const values = watch();

  const submitHandler = (data: RecipeFormValues) => {
    const { ingredientInput, tagInput, ...cleaned } = data;
    void ingredientInput;
    void tagInput;
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <input
        {...register("title")}
        className="w-full border p-2 rounded"
        placeholder="Recipe title"
      />

      <div>
        <div className="flex gap-2 mb-2">
          <input
            {...register("ingredientInput")}
            placeholder="Add ingredient"
            className="border p-2 flex-1 rounded"
          />
          <button
            type="button"
            onClick={() => addItem("ingredients", "ingredientInput")}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <ul className="text-sm list-disc list-inside">
          {values.ingredients.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </div>

      <textarea
        {...register("instructions")}
        className="w-full border p-2 rounded h-32"
        placeholder="Instructions"
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          {...register("prepTime", { valueAsNumber: true })}
          placeholder="Prep Time"
          type="number"
        />
        <input
          {...register("cookTime", { valueAsNumber: true })}
          placeholder="Cook Time"
          type="number"
        />
        <input
          {...register("servings", { valueAsNumber: true })}
          placeholder="Servings"
          type="number"
        />
      </div>

      <div>
        <div className="flex gap-2 mb-2">
          <input
            {...register("tagInput")}
            placeholder="Add tag"
            className="border p-2 flex-1 rounded"
          />
          <button
            type="button"
            onClick={() => addItem("tags", "tagInput")}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {values.tags.map((t, idx) => (
            <span
              key={idx}
              className="bg-amber-100 text-xs text-amber-800 px-2 py-1 rounded"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-black text-white px-6 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
