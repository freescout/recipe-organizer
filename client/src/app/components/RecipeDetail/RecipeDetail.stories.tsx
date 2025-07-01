import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeDetail from "./RecipeDetail";

const meta: Meta<typeof RecipeDetail> = {
  title: "Components/RecipeDetail",
  component: RecipeDetail,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RecipeDetail>;

export const Default: Story = {
  args: {
    title: "Spicy Chickpea Curry",
    imageUrl: "https://source.unsplash.com/800x600/?chickpeas,curry",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    tags: ["vegan", "dinner", "easy"],
    ingredients: [
      "1 tbsp olive oil",
      "1 onion, diced",
      "2 garlic cloves, minced",
      "1 tsp cumin",
      "1 can chickpeas, drained",
      "1 can diced tomatoes",
      "Salt & pepper to taste",
    ],
    instructions: `1. Heat olive oil in a large pan over medium heat.\n2. Add onion and garlic, sauté until soft.\n3. Stir in cumin and cook for 1 minute.\n4. Add chickpeas and tomatoes. Simmer for 20 minutes.\n5. Season and serve warm.`,
  },
};
