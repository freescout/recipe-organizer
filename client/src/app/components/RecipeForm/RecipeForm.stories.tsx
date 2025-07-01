import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeForm from "./RecipeForm";

const meta: Meta<typeof RecipeForm> = {
  title: "Components/RecipeForm",
  component: RecipeForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecipeForm>;

export const EmptyForm: Story = {
  args: {
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
  },
};

export const WithInitialData: Story = {
  args: {
    onSubmit: (data) => console.log(data),
    initialData: {
      title: "Sample Recipe",
      ingredients: ["1 cup flour", "2 eggs"],
      instructions: "Mix and bake.",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      tags: ["quick", "easy"],
    },
  },
};
