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
    title: "Creamy Garlic Chicken",
    imageUrl:
      "https://www.budgetbytes.com/wp-content/uploads/2024/02/Creamy-Garlic-Chicken-Pan-500x500.jpg",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    tags: ["dinner", "easy"],
  },
};
