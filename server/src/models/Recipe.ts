import { Schema, model, Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  user: Schema.Types.ObjectId;
  isPublic: boolean;
  tags?: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

const RecipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: {
      type: Number,
      required: true,
      min: [1, "Servings must be at least 1"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublic: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

import { slugify } from "../utils/slugify";

RecipeSchema.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
