import { test, expect } from "@playwright/test";
import { registerUserViaApi, uniqueEmail } from "./helpers";

test("registers a new user and logs them in", async ({ page }) => {
  const email = uniqueEmail();
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
  const user = await registerUserViaApi(request, "Duplicate Tester");

  await page.goto("/register");

  await page.getByPlaceholder("Name").fill(user.name);
  await page.getByPlaceholder("Email").fill(user.email);
  await page.getByPlaceholder("Password").fill(user.password);
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("User already exists")).toBeVisible();
  await expect(page).toHaveURL("/register");
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
