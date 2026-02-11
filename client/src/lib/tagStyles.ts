export const TAG_CATEGORIES = {
  diet: ["vegetarian", "vegan", "glutenfree", "dairyfree", "keto", "paleo"],
  cuisine: [
    "indian",
    "asian",
    "italian",
    "mexican",
    "chinese",
    "japanese",
    "thai",
  ],
  speed: ["quick", "30min", "easy", "weeknight"],
  health: ["healthy", "lowcarb", "highprotein", "lowfat"],
  meal: ["breakfast", "lunch", "dinner", "snack", "dessert"],
  method: ["baked", "grilled", "stirfry", "soup", "salad"],
  mood: ["comfort", "cozy", "fresh", "hearty"],
};

type TagCategory = keyof typeof TAG_CATEGORIES;

const CATEGORY_STYLES: Record<string, string> = {
  diet: "bg-green-50 text-green-700 border-green-200",
  cuisine: "bg-orange-50 text-orange-700 border-orange-200",
  speed: "bg-blue-50 text-blue-700 border-blue-200",
  health: "bg-emerald-50 text-emerald-700 border-emerald-200",
  meal: "bg-purple-50 text-purple-700 border-purple-200",
  method: "bg-amber-50 text-amber-700 border-amber-200",
  mood: "bg-rose-50 text-rose-700 border-rose-200",
};

const DEFAULT_STYLE = "bg-gray-50 text-gray-700 border-gray-200";
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const TAG_LOOKUP: Record<string, TagCategory> = Object.entries(
  TAG_CATEGORIES,
).reduce(
  (acc, [category, tags]) => {
    tags.forEach((tag) => {
      acc[normalizeTag(tag)] = category as TagCategory;
    });
    return acc;
  },
  {} as Record<string, TagCategory>,
);

export function getTagStyle(tag: string): string {
  const normalized = normalizeTag(tag);
  const category = TAG_LOOKUP[normalized];

  return category ? CATEGORY_STYLES[category] : DEFAULT_STYLE;
}
