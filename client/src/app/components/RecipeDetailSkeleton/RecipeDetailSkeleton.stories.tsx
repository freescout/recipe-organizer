import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeDetailSkeleton from "./RecipeDetailSkeleton";

const meta: Meta<typeof RecipeDetailSkeleton> = {
  title: "Components/RecipeDetailSkeleton",
  component: RecipeDetailSkeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecipeDetailSkeleton>;

export const Default: Story = {};
