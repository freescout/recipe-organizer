import { defineConfig } from "vitest/config";

if (process.env.SKIP_VITEST_PLUGIN === "true") {
  console.log("Skipping vitest plugin due to SKIP_VITEST_PLUGIN=true");
}

export default defineConfig({
  test: {
    projects:
      process.env.SKIP_VITEST_PLUGIN === "true"
        ? []
        : [
            {
              extends: true,
              plugins: [],
              test: {
                name: "storybook",
                browser: {
                  enabled: true,
                  headless: true,
                  provider: "playwright",
                  instances: [{ browser: "chromium" }],
                },
                setupFiles: [".storybook/vitest.setup.ts"],
              },
            },
          ],
  },
});
