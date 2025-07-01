import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Layout from "./Layout";

const meta: Meta<typeof Layout> = {
  title: "Components/Layout",
  component: Layout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const WithSampleContent: Story = {
  args: {
    children: (
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold">Inside Layout</h1>
        <p className="text-gray-600 mt-2">
          This is a test area inside the layout.
        </p>
      </div>
    ),
  },
};
