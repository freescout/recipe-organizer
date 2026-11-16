import { expect, type APIRequestContext } from "@playwright/test";

const API_URL = "http://localhost:7000/api";

export function uniqueEmail() {
  return `e2e-${crypto.randomUUID()}@test.local`;
}

export async function registerUserViaApi(
  request: APIRequestContext,
  name = "E2E Tester",
) {
  const user = { name, email: uniqueEmail(), password: "Password123!" };

  const res = await request.post(`${API_URL}/auth/register`, { data: user });
  expect(res.ok()).toBeTruthy();

  return user;
}
