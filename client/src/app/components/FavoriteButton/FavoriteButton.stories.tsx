import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FavoriteButton from "./FavoriteButton";

const meta: Meta<typeof FavoriteButton> = {
  title: "Components/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

export const NotFavorited: Story = {
  args: {
    initialIsFavorited: false,
  },
};

export const Favorited: Story = {
  args: {
    initialIsFavorited: true,
  },
};
