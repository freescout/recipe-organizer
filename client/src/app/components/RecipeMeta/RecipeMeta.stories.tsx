import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeMeta from "./RecipeMeta";

const meta: Meta<typeof RecipeMeta> = {
  title: "Components/RecipeMeta",
  component: RecipeMeta,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecipeMeta>;

export const Default: Story = {
  args: {
    prepTime: 10,
    cookTime: 20,
    servings: 4,
  },
};
