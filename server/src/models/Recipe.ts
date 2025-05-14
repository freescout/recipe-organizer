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
}

const RecipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublic: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
