import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TagbadgeList from "./TagBadgeList";

const meta: Meta<typeof TagbadgeList> = {
  title: "Components/TagBadgeList",
  component: TagbadgeList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagbadgeList>;

export const WithTags: Story = {
  args: {
    tags: ["vegan", "dinner", "quick"],
  },
};

export const Empty: Story = {
  args: {
    tags: [],
  },
};
