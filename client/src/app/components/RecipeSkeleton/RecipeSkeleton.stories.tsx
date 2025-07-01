import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecipeSkeleton from "./RecipeSkeleton";

const meta: Meta<typeof RecipeSkeleton> = {
  title: "Components/RecipeSkeleton",
  component: RecipeSkeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecipeSkeleton>;

export const Default: Story = {};
