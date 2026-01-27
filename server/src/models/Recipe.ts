import { Schema, model, Types } from "mongoose";

export interface IIngredient {
  item: string;
  quantity?: number;
  unit?: string;
  notes?: string;
}

export interface IRecipe {
  title: string;
  ingredients: IIngredient[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  user: Types.ObjectId;
  isPublic: boolean;
  tags?: string[];
  imageUrl?: string;
  slug: string;
}

const IngredientSchema = new Schema<IIngredient>(
  {
    item: {
      type: String,
      required: [true, "Ingredient item is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      min: [0, "Quantity cannot be negative"],
    },
    unit: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: [
          // Volume
          "tsp",
          "tbsp",
          "cup",
          "cups",
          "ml",
          "l",
          "fl oz",
          // Weight
          "g",
          "kg",
          "oz",
          "lb",
          "mg",
          // Count
          "piece",
          "pieces",
          "whole",
          "clove",
          "cloves",
          // Other
          "pinch",
          "dash",
        ],
        message: "Invalid unit",
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [100, "Notes cannot exceed 100 characters"],
    },
  },
  { _id: false }, // Don't create _id for sub-documents
);

IngredientSchema.pre("validate", function (next) {
  if (this.unit && this.quantity == null) {
    return next(new Error("Quantity is required when unit is specified"));
  }
  next();
});

const RecipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    ingredients: {
      type: [IngredientSchema],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (v: IIngredient[]) => v.length > 0,
        message: "At least one ingredient is required",
      },
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },
    prepTime: {
      type: Number,
      required: [true, "Prep time is required"],
      min: [0, "Prep time cannot be negative"],
    },
    cookTime: {
      type: Number,
      required: [true, "Cook time is required"],
      min: [0, "Cook time cannot be negative"],
    },
    servings: {
      type: Number,
      required: [true, "Servings are required"],
      min: [1, "Servings must be at least 1"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    isPublic: { type: Boolean, default: false },
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) =>
        tags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0),
      validate: {
        validator: (v: string[]) => v.every((tag) => tag.length > 0),
        message: "Tags cannot be empty strings",
      },
    },

    imageUrl: {
      type: String,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: "Image URL must be a valid URL",
      },
    },
    slug: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

import { slugify } from "../utils/slugify";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
RecipeSchema.pre("save", async function (next) {
  // Generate slug if: (1) new document, (2) title changed, OR (3) slug is missing
  if (!this.isNew && !this.isModified("title") && this.slug) {
    return next();
  }

  type SlugOnly = { slug: string };

  try {
    const baseSlug = slugify(this.title);
    const RecipeModel = this.model("Recipe");
    const escapedSlug = escapeRegex(baseSlug);
    // Single query to find all matching slugs for this user
    const existingSlugs = await RecipeModel.find(
      {
        user: this.user,
        slug: new RegExp(`^${escapedSlug}(-\\d+)?$`),
        _id: { $ne: this._id },
      },
      { slug: 1 },
    ).lean<SlugOnly[]>();

    if (existingSlugs.length === 0) {
      this.slug = baseSlug;
    } else {
      // Extract numbers from existing slugs and find the highest
      const numbers = existingSlugs
        .map((doc) => {
          const match = doc.slug.match(/-(\d+)$/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter((n) => n > 0);

      const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
      this.slug =
        maxNumber > 0 ? `${baseSlug}-${maxNumber + 1}` : `${baseSlug}-1`;
    }

    next();
  } catch (error) {
    // Forward error to Mongoose error handling
    next(error as Error);
  }
});

RecipeSchema.virtual("totalTime").get(function () {
  return this.prepTime + this.cookTime;
});

RecipeSchema.index({ user: 1, slug: 1 }, { unique: true });
RecipeSchema.index({ isPublic: 1, createdAt: -1 });

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
