import mongoose from "mongoose";
import { generateToken } from "../../src/utils/jwt";
import User from "../../src/models/User";
import Recipe from "../../src/models/Recipe";
import request from "supertest";
import app from "../../src/app";

jest.setTimeout(20000);

jest.mock("cloudinary");

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

let recipeId: string;

beforeAll(async () => {
  await User.deleteMany({});
  await Recipe.deleteMany({});

  await User.create({
    _id: owner.id,
    name: owner.name,
    email: owner.email,
    password: "dummy-password",
  });

  const recipe = await Recipe.create({
    title: "Tomato Pasta",
    ingredients: [{ item: "pasta" }, { item: "garlic" }, { item: "tomato" }],
    instructions: ["Cook pasta."],
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    user: owner.id,
    isPublic: true,
    slug: "tomato-pasta",
  });
  recipeId = recipe._id.toString();
});

describe("POST /api/recipes/:id/image", () => {
  it("should upload image for recipe owner", async () => {
    const imageBuffer = Buffer.from("fake image data");
    const res = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .attach("image", imageBuffer, "test.jpg");

    expect(res.statusCode).toBe(200);
    expect(res.body.imageUrl).toBeDefined();
    expect(res.body.imageUrl).toBe(
      "https://res.cloudinary.com/test/image/upload/test.jpg",
    );

    const updatedRecipe = await Recipe.findById(recipeId);
    expect(updatedRecipe?.imageUrl).toBe(res.body.imageUrl);
  });

  it("should return 401 if not authenticated", async () => {
    const imageBuffer = Buffer.from("fake image data");

    const res = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .attach("image", imageBuffer, "test.jpg");

    expect(res.statusCode).toBe(401);
  });

  it("should return 403 if user does not own the recipe", async () => {
    const imageBuffer = Buffer.from("fake image data");

    const res = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .set("Authorization", `Bearer ${strangerToken}`)
      .attach("image", imageBuffer, "test.jpg");

    expect(res.statusCode).toBe(403);
  });

  it("should return 400 if no image is provided", async () => {
    const res = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(400);
  });

  it("should return 404 if recipe does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const imageBuffer = Buffer.from("fake image data");

    const res = await request(app)
      .post(`/api/recipes/${fakeId}/image`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .attach("image", imageBuffer, "test.jpg");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Recipe not found");
  });

  it("should replace existing image URL when uploading new image", async () => {
    // First upload
    const imageBuffer1 = Buffer.from("fake image data 1");
    const res1 = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .attach("image", imageBuffer1, "test1.jpg");

    expect(res1.statusCode).toBe(200);
    const firstImageUrl = res1.body.imageUrl;

    // Second upload - should replace
    const imageBuffer2 = Buffer.from("fake image data 2");
    const res2 = await request(app)
      .post(`/api/recipes/${recipeId}/image`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .attach("image", imageBuffer2, "test2.jpg");

    expect(res2.statusCode).toBe(200);
    expect(res2.body.imageUrl).toBeDefined();

    // Verify the recipe has the new URL
    const updatedRecipe = await Recipe.findById(recipeId);
    expect(updatedRecipe?.imageUrl).toBe(res2.body.imageUrl);
  });
});
