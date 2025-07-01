import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IngredientList from "./IngredientList";

const meta: Meta<typeof IngredientList> = {
  title: "components/IngredientList",
  component: IngredientList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IngredientList>;

export const Default: Story = {
  args: {
    ingredients: [
      "1 tbsp olive oil",
      "2 garlic cloves, minced",
      "1 onion, diced",
      "1 tsp ground cumin",
      "400g canned chickpeas",
    ],
  },
};
