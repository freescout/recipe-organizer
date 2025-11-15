import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeCard from "./RecipeCard";

const meta: Meta<typeof RecipeCard> = {
  title: "components/RecipeCard",
  component: RecipeCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {
  args: {
    recipe: {
      _id: "1",
      title: "Creamy Garlic Chicken",
      description: "",
      imageUrl:
        "https://www.budgetbytes.com/wp-content/uploads/2024/02/Creamy-Garlic-Chicken-Pan-500x500.jpg",
      tags: ["dinner", "easy"],
      ingredients: [],
      instructions: "",
      steps: [],
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      slug: "creamy-garlic-chicken",
      author: {
        name: "Test User",
        id: "123",
      },
      createdAt: "",
      updatedAt: "",
    },
  },
};
