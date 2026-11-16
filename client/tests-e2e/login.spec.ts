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

test("shows an error for a wrong password", async ({ page, request }) => {
  const email = `e2e-${Date.now()}@test.local`;

  const res = await request.post("http://localhost:7000/api/auth/register", {
    data: { name: "Wrong Password Tester", email, password: "Password123!" },
  });
  expect(res.ok()).toBeTruthy();
  await page.goto("/login");
  await page.getByLabel("Your email").fill(email);
  await page.getByLabel("Your password").fill("WrongPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid email or password")).toBeVisible();
  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
