/// <reference types="jest" />
import request from "supertest";
import app from "../../src/app";

describe("POST /api/auth/login", () => {
  it("returns a token that works on protected routes", async () => {
    // A unique email, so the test never clashes with existing users
    const email = `login-${Date.now()}@example.com`;
    const password = "password123";

    // 1. Register a user
    await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email, password })
      .expect(201);

    // 2. Log in with that user
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email, password })
      .expect(200);

    // 3. Use the login token on a protected route
    await request(app)
      .get("/api/recipes")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .expect(200);
  });
});
