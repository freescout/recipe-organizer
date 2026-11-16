import { test, expect } from "@playwright/test";

test("registers a new user, logs them in and then logs them out", async ({
  page,
}) => {
  const email = `e2e-${Date.now()}@test.local`;
  const name = "New Tester";

  await page.goto("/register");

  await page.getByPlaceholder("Name").fill(name);
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill("Password123!");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText(`Hi, ${name}`)).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  await expect(page.getByText(`Hi, ${name}`)).toBeHidden();

  await page.reload();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  await expect(page.getByText(`Hi, ${name}`)).toBeHidden();
});
