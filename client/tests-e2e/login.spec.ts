import { test, expect } from "@playwright/test";

test("logs in an existing user and greets them in the header", async ({
  page,
}) => {
  await page.goto("/login");

  await page.getByLabel("Your email").fill("e2e@test.local");
  await page.getByLabel("Your password").fill("Password123!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText("Hi, E2E User")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});
