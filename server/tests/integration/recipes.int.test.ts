/* import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app"; // Adjust the import based on your app entry point
import Recipe from "../../src/models/Recipe";
import { generateToken } from "../../src/utils/jwt";

jest.setTimeout(20000); // 20 seconds, to be safe

const owner = {
  id: new mongoose.Types.ObjectId().toHexString(),
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

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI!);
  await Recipe.deleteMany({});

  const publicRecipe = await Recipe.create({
    title: "Grilled Chicken",
    ingredients: ["chicken", "garlic", "lemon"],
    instructions: "Grill it.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    user: owner.id,
    isPublic: true,
    slug: "grilled-chicken",
  });
  //await recipe.save();
  publicRecipeId = (publicRecipe._id as mongoose.Types.ObjectId).toString();

  const privateRecipe = await Recipe.create({
    title: "Secret Lamb Curry",
    ingredients: ["lamb", "spices"],
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

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("GET /api/recipes/public", () => {
  it("should return  public recipes without token", async () => {
    const res = await request(app).get(`/api/recipes/public`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach((recipe: any) => {
      expect(recipe.isPublic).toBe(true);
    });
  });

  it("should return the same public recipes with token", async () => {
    const res = await request(app)
      .get("/api/recipes/public")
      .set("Authorization", `Bearer ${strangerToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((recipe: any) => {
      expect(recipe.isPublic).toBe(true);
    });
  });

  it("should not include private recipes in the response", async () => {
    const res = await request(app).get("/api/recipes/public");
    const privateRes = res.body.find(
      (r: any) => r.title === "Secret Lamb Curry"
    );
    expect(privateRes).toBeUndefined();
  });
});

describe("GET /api/recipes/:id", () => {
  it("should allow owner to view their private recipe", async () => {
    const res = await request(app)
      .get(`/api/recipes/${privateRecipeId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Secret Lamb Curry");
  });

  it("should deny access to a private recipe for stranger", async () => {
    const res = await request(app)
      .get(`/api/recipes/${privateRecipeId}`)
      .set("Authorization", `Bearer ${strangerToken}`);

    expect([403, 404]).toContain(res.statusCode);
  });

  it("should allow anyone to view a public recipe", async () => {
    const res = await request(app).get(`/api/recipes/${publicRecipeId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Grilled Chicken");
  });
  it("should return 404 for non-existent recipe ID", async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .get(`/api/recipes/${fakeId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/recipes", () => {
  it("should create a new recipe", async () => {
    const newRecipe = {
      title: "Lemon Fish Curry",
      ingredients: ["fish", "lemon", "turmeric"],
      instructions: "Mix and cook",
      prepTime: 15,
      cookTime: 20,
      servings: 3,
      isPublic: true,
    };

    const res = await request(app)
      .post("/api/recipes")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(newRecipe);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Lemon Fish Curry");
    expect(res.body.ingredients).toContain("fish");
    expect(res.body.user).toBe(owner.id);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .send({
        title: "No Token Recipe",
        ingredients: ["fail"],
        instructions: "fail",
        prepTime: 5,
        cookTime: 5,
        servings: 1,
      });

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/recipes", () => {
  it("should return only the owner's recipes", async () => {
    const res = await request(app)
      .get("/api/recipes")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    res.body.forEach((recipe: any) => {
      expect(recipe.user).toBe(owner.id);
    });
  });

  it("should return only stranger's recipes (likely empty)", async () => {
    const res = await request(app)
      .get("/api/recipes")
      .set("Authorization", `Bearer ${strangerToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((recipe: any) => {
      expect(recipe.user).toBe(stranger.id);
    });
  });

  it("should return recipes with 'chicken", async () => {
    const res = await request(app)
      .get("/api/recipes?ingredient=chicken")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].ingredients).toContain("chicken");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/recipes");

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/recipes/slug/:slug", () => {
  it("should return a public recipe by slug without token", async () => {
    const res = await request(app).get("/api/recipes/slug/grilled-chicken");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Grilled Chicken");
  });

  it("should allow owner to access private recipe by slug", async () => {
    const res = await request(app)
      .get("/api/recipes/slug/secret-lamb-curry")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Secret Lamb Curry");
  });

  it("should deny access to private recipe slug for stranger", async () => {
    const res = await request(app)
      .get("/api/recipes/slug/secret-lamb-curry")
      .set("Authorization", `Bearer ${strangerToken}`);

    expect([403, 404]).toContain(res.statusCode);
  });

  it("should return 404 for unknown slug", async () => {
    const res = await request(app).get("/api/recipes/slug/non-existent");

    expect(res.statusCode).toBe(404);
  });
});

describe("PUT /api/recipes/:id", () => {
  it("should allow owner to update their recipe", async () => {
    const updated = {
      title: "Updated Lamb Curry",
      prepTime: 15,
    };
    const res = await request(app)
      .put(`/api/recipes/${privateRecipeId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updated.title);
    expect(res.body.prepTime).toBe(updated.prepTime);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .put(`/api/recipes/${privateRecipeId}`)
      .send({ title: "Unauthorized Update" });

    expect(res.statusCode).toBe(401);
  });

  it("should return 403 or 404 if stranger tries to update another's recipe", async () => {
    const res = await request(app)
      .put(`/api/recipes/${privateRecipeId}`)
      .set("Authorization", `Bearer ${strangerToken}`)
      .send({ title: "Malicious Update" });

    expect([403, 404]).toContain(res.statusCode);
  });
});

describe("DELETE /api/recipes/:id", () => {
  let deletableId: string;
  beforeAll(async () => {
    const deletable = await Recipe.create({
      title: "Temp Rice ",
      ingredients: ["rice", "salt"],
      instructions: "Steam it.",
      prepTime: 5,
      cookTime: 15,
      servings: 1,
      user: owner.id,
      isPublic: true,
      slug: "temp-deletable",
    });

    deletableId = (deletable._id as mongoose.Types.ObjectId).toString();
  });
  it("should allow owner to delete their  recipe", async () => {
    const res = await request(app)
      .delete(`/api/recipes/${deletableId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    const check = await Recipe.findById(deletableId);
    expect(check).toBeNull();
  });

  it("should deny delete without token", async () => {
    const res = await request(app).delete(`/api/recipes/${publicRecipeId}`);
    expect(res.statusCode).toBe(401);
  });

  it("should deny delete by a stranger", async () => {
    const res = await request(app)
      .delete(`/api/recipes/${publicRecipeId}`)
      .set("Authorization", `Bearer ${strangerToken}`);
    expect([403, 404]).toContain(res.statusCode);
  });
});
 */

import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import Recipe from "../../src/models/Recipe";
import { generateToken } from "../../src/utils/jwt";

jest.setTimeout(20000);

const owner = {
  id: new mongoose.Types.ObjectId().toHexString(),
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
  await mongoose.connect(process.env.TEST_DB_URI!);
  await Recipe.deleteMany({});

  const publicRecipe = await Recipe.create({
    title: "Grilled Chicken",
    ingredients: ["chicken", "garlic", "lemon"],
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
    ingredients: ["lamb", "spices"],
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

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("GET /api/recipes/public", () => {
  it("should return only public recipes", async () => {
    const res = await request(app).get("/api/recipes/public");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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

describe("GET /api/recipes/:id", () => {
  it("should allow owner to view private recipe", async () => {
    const res = await authGet(`/api/recipes/${privateRecipeId}`, ownerToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Secret Lamb Curry");
  });

  it("should deny access to stranger", async () => {
    const res = await authGet(`/api/recipes/${privateRecipeId}`, strangerToken);
    expect([403, 404]).toContain(res.statusCode);
  });

  it("should return public recipe without token", async () => {
    const res = await request(app).get(`/api/recipes/${publicRecipeId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should return 404 for unknown id", async () => {
    const res = await authGet(
      `/api/recipes/${new mongoose.Types.ObjectId()}`,
      ownerToken
    );
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/recipes", () => {
  it("should create a recipe", async () => {
    const res = await authPost("/api/recipes", ownerToken, {
      title: "Lemon Fish Curry",
      ingredients: ["fish", "lemon"],
      instructions: "Cook it.",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      isPublic: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Lemon Fish Curry");
    expect(res.body.ingredients).toContain("fish");
    expect(res.body.user).toBe(owner.id);
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
    res.body.forEach((r: any) => expect(r.ingredients).toContain("chicken"));
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
      ownerToken
    );
    expect(res.statusCode).toBe(200);
  });

  it("should deny access to stranger", async () => {
    const res = await authGet(
      "/api/recipes/slug/secret-lamb-curry",
      strangerToken
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
      { title: "Hack" }
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
      ingredients: ["salt"],
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
      strangerToken
    );
    expect([403, 404]).toContain(res.statusCode);
  });
});
