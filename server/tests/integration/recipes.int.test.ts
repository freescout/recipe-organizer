/// <reference types="jest" />
import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import Recipe from "../../src/models/Recipe";
import { generateToken } from "../../src/utils/jwt";
import User from "../../src/models/User";

jest.setTimeout(20000);

const owner = {
  id: new mongoose.Types.ObjectId().toHexString(),
  name: "owner",
  email: "owner@example.com",
};
const stranger = {
  id: new mongoose.Types.ObjectId().toHexString(),
  email: "viewer@example.com",
};
const ownerToken = generateToken(owner);
const strangerToken = generateToken(stranger);

let publicRecipeId: string;
let privateRecipeId: string;

const authGet = (url: string, token: string) =>
  request(app).get(url).set("Authorization", `Bearer ${token}`);
const authPost = (url: string, token: string, body: any) =>
  request(app).post(url).set("Authorization", `Bearer ${token}`).send(body);
const authPut = (url: string, token: string, body: any) =>
  request(app).put(url).set("Authorization", `Bearer ${token}`).send(body);
const authDelete = (url: string, token: string) =>
  request(app).delete(url).set("Authorization", `Bearer ${token}`);

beforeAll(async () => {
  await Recipe.deleteMany({});
  await User.deleteMany({});

  // Insert the user matching the token
  await User.create({
    _id: owner.id,
    name: owner.name,
    email: owner.email,
    password: "dummy-password", // doesn't matter for the test
  });

  const publicRecipe = await Recipe.create({
    title: "Grilled Chicken",
    ingredients: [{ item: "chicken" }, { item: "garlic" }, { item: "lemon" }],
    instructions: "Grill it.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    user: owner.id,
    isPublic: true,
    slug: "grilled-chicken",
  });
  publicRecipeId = (publicRecipe._id as mongoose.Types.ObjectId).toString();

  const privateRecipe = await Recipe.create({
    title: "Secret Lamb Curry",
    ingredients: [{ item: "lamb" }, { item: "spices" }],
    instructions: "Cook slowly",
    prepTime: 20,
    cookTime: 60,
    servings: 4,
    user: owner.id,
    isPublic: false,
    slug: "secret-lamb-curry",
  });
  privateRecipeId = (privateRecipe._id as mongoose.Types.ObjectId).toString();
});

describe("GET /api/recipes/public", () => {
  it("should return only public recipes", async () => {
    const res = await request(app).get("/api/recipes/public");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((recipe: any) => {
      expect(recipe.isPublic).toBe(true);
    });
  });

  it("should work with token as well", async () => {
    const res = await authGet("/api/recipes/public", strangerToken);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((recipe: any) => {
      expect(recipe.isPublic).toBe(true);
    });
  });

  it("should exclude private recipes", async () => {
    const res = await request(app).get("/api/recipes/public");
    const found = res.body.find((r: any) => r.title === "Secret Lamb Curry");
    expect(found).toBeUndefined();
  });
});

describe("POST /api/recipes", () => {
  it("should create a recipe", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      title: "Lemon Fish Curry",
      ingredients: [{ item: "fish" }, { item: "lemon" }],
      instructions: "Cook it.",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      isPublic: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Lemon Fish Curry");
    expect(res.body.ingredients.some((i: any) => i.item === "fish")).toBe(true);
    expect(res.body.user).toBe(owner.id);
  });

  it("should auto-generate slug from title", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      title: "Grilled Chicken",
      ingredients: [{ item: "x" }],
      instructions: "test",
      prepTime: 1,
      cookTime: 1,
      servings: 1,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.slug).toMatch(/^grilled-chicken(-\d+)?$/);
  });

  it("should return empty array when ingredient not found", async () => {
    const res = await authGet(
      "/api/recipes?ingredient=nonexistent",
      ownerToken,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should filter by ingredient correctly when multiple exist", async () => {
    // Create recipe with multiple ingredients
    await authPost("/api/recipes", ownerToken, {
      title: "Complex Dish",
      ingredients: [{ item: "chicken" }, { item: "beef" }, { item: "pork" }],
      instructions: "Cook all meats",
      prepTime: 30,
      cookTime: 60,
      servings: 4,
    });

    const res = await authGet("/api/recipes?ingredient=beef", ownerToken);
    expect(res.statusCode).toBe(200);

    const complexDish = res.body.find((r: any) => r.title === "Complex Dish");
    expect(complexDish).toBeDefined();
    expect(complexDish.ingredients.some((i: any) => i.item === "beef")).toBe(
      true,
    );
  });

  it("should reject empty ingredients array", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      title: "Bad recipe",
      ingredients: [],
      instructions: "test",
      prepTime: 1,
      cookTime: 1,
      servings: 1,
    });
    expect([400, 422]).toContain(res.statusCode);
  });

  it("should fail if required field is missing", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      // title missing
      ingredients: ["x"],
      instructions: "test",
      prepTime: 1,
      cookTime: 1,
      servings: 1,
    });

    expect([400, 422]).toContain(res.statusCode);
  });

  it("should reject ingredient with unit but no quantity", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      title: "Bad Ingredient",
      ingredients: [{ item: "salt", unit: "tsp" }],
      instructions: "test",
      prepTime: 1,
      cookTime: 1,
      servings: 1,
    });

    expect([400, 422]).toContain(res.statusCode);
  });

  it("should return 401 without token", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .send({ title: "No Auth" });
    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/recipes", () => {
  it("should return owner's recipes", async () => {
    const res = await authGet("/api/recipes", ownerToken);
    expect(res.statusCode).toBe(200);
    res.body.forEach((r: any) => expect(r.user).toBe(owner.id));
  });

  it("should return stranger's recipes", async () => {
    const res = await authGet("/api/recipes", strangerToken);
    expect(res.statusCode).toBe(200);
    res.body.forEach((r: any) => expect(r.user).toBe(stranger.id));
  });

  it("should support query filter", async () => {
    const res = await authGet("/api/recipes?ingredient=chicken", ownerToken);
    expect(res.statusCode).toBe(200);

    res.body.forEach((r: any) => {
      expect(r.ingredients.some((i: any) => i.item === "chicken")).toBe(true);
    });
  });

  it("should fail without token", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/recipes/slug/:slug", () => {
  it("should return public recipe without token", async () => {
    const res = await request(app).get("/api/recipes/slug/grilled-chicken");
    expect(res.statusCode).toBe(200);
  });

  it("should allow owner to access private recipe", async () => {
    const res = await authGet(
      "/api/recipes/slug/secret-lamb-curry",
      ownerToken,
    );
    expect(res.statusCode).toBe(200);
  });

  it("should deny access to stranger", async () => {
    const res = await authGet(
      "/api/recipes/slug/secret-lamb-curry",
      strangerToken,
    );
    expect([403, 404]).toContain(res.statusCode);
  });

  it("should return 404 for unknown slug", async () => {
    const res = await request(app).get("/api/recipes/slug/non-existent");
    expect(res.statusCode).toBe(404);
  });
});

describe("PUT /api/recipes/:id", () => {
  it("should update recipe", async () => {
    const res = await authPut(`/api/recipes/${privateRecipeId}`, ownerToken, {
      title: "Updated",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated");
  });

  it("should deny stranger update", async () => {
    const res = await authPut(
      `/api/recipes/${privateRecipeId}`,
      strangerToken,
      { title: "Hack" },
    );
    expect([403, 404]).toContain(res.statusCode);
  });

  it("should return 400 on invalid data", async () => {
    const res = await authPut(`/api/recipes/${privateRecipeId}`, ownerToken, {
      servings: -2,
    });
    expect([400, 422]).toContain(res.statusCode);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .put(`/api/recipes/${privateRecipeId}`)
      .send({ title: "Unauthorized Update" });

    expect(res.statusCode).toBe(401);
  });
});

describe("DELETE /api/recipes/:id", () => {
  let deletableId: string;
  beforeAll(async () => {
    const recipe = await Recipe.create({
      title: "Temp Delete",
      ingredients: [{ item: "salt" }],
      instructions: "Just do it.",
      prepTime: 1,
      cookTime: 1,
      servings: 1,
      isPublic: true,
      slug: "temp-delete",
      user: owner.id,
    });
    deletableId = (recipe._id as mongoose.Types.ObjectId).toString();
  });

  it("should delete recipe by owner", async () => {
    const res = await authDelete(`/api/recipes/${deletableId}`, ownerToken);
    expect(res.statusCode).toBe(200);
    const check = await Recipe.findById(deletableId);
    expect(check).toBeNull();
  });

  it("should deny delete without token", async () => {
    const res = await request(app).delete(`/api/recipes/${publicRecipeId}`);
    expect(res.statusCode).toBe(401);
  });

  it("should deny delete by stranger", async () => {
    const res = await authDelete(
      `/api/recipes/${publicRecipeId}`,
      strangerToken,
    );
    expect([403, 404]).toContain(res.statusCode);
  });
});

describe("Favorite Recipes", () => {
  let favId: string;

  beforeAll(() => {
    favId = publicRecipeId;
  });

  it("should add recipe to favorites", async () => {
    expect(favId).toBeDefined();
    expect(mongoose.Types.ObjectId.isValid(favId)).toBe(true);

    const res = await authPost(
      `/api/recipes/${favId}/favorite`,
      ownerToken,
      {},
    );
    //expect(res.statusCode).toBe(200);
  });

  it("should return favorite recipes", async () => {
    const res = await authGet("/api/recipes/favorites", ownerToken);
    expect(res.statusCode).toBe(200);
    const match = res.body.find((r: any) => r._id === favId);
    expect(match).toBeDefined();
  });
});
