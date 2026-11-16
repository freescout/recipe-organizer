import { test, expect } from "@playwright/test";
import { registerUserViaApi } from "./helpers";

test("logs in an existing user and greets them in the header", async ({
  page,
  request,
}) => {
  const user = await registerUserViaApi(request, "Login Tester");

  await page.goto("/login");
  await page.getByLabel("Your email").fill(user.email);
  await page.getByLabel("Your password").fill(user.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText(`Hi, ${user.name}`)).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});

test("shows an error for a wrong password", async ({ page, request }) => {
  const user = await registerUserViaApi(request);

  await page.goto("/login");
  await page.getByLabel("Your email").fill(user.email);
  await page.getByLabel("Your password").fill("WrongPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid email or password")).toBeVisible();
  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
