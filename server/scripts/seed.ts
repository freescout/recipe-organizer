import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../../server/src/models/User";
import Recipe from "../../server/src/models/Recipe";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");

    // Wipe existing data
    await User.deleteMany();
    await Recipe.deleteMany();
    console.log("Exisitng data cleared");

    // Create user
    const hashPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashPassword,
    });
    console.log("Test user created", user.email);

    // Create recipes
    const recipes = [
      {
        title: "Spaghetti Bolognese",
        ingredients: ["spaghetti", "ground beef", "tomato sauce"],
        instructions: "Boil pasta. Cook beef. Mix with sauce.",
        prepTime: 10,
        cookTime: 30,
        servings: 4,
        isPublic: true,
        user: user._id,
        slug: "spaghetti-bolognese",
      },
      {
        title: "Avocado Toast",
        ingredients: ["bread", "avocado", "salt"],
        instructions: "Toast bread. Smash avocado. Spread and season.",
        prepTime: 5,
        cookTime: 2,
        servings: 1,
        isPublic: false,
        user: user._id,
        slug: "avocado-toast",
      },
    ];

    await Recipe.insertMany(recipes);
    console.log("Recipes inserted");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}
seed();
