import { test, expect } from "@playwright/test";

test("registers a new user and logs them in", async ({ page }) => {
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
});

test("shows an error for a duplicate user", async ({ page, request }) => {
  const email = `e2e-${Date.now()}@test.local`;
  const name = "Duplicate Tester";

  const res = await request.post("http://localhost:7000/api/auth/register", {
    data: { name, email, password: "Password123!" },
  });
  expect(res.ok()).toBeTruthy();
  await page.goto("/register");

  await page.getByPlaceholder("Name").fill(name);
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill("Password123!");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("User already exists")).toBeVisible();
  await expect(page).toHaveURL("/register");
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
