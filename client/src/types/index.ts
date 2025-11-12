export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  ingredients: string[];
  instructions: string;
  steps: string[];
  createdAt?: string;
  updatedAt?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  slug: string;
  author?: {
    name: string;
    id: string;
  };
}
