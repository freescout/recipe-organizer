export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, " ") // Replace non-word characters with space
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with dashes
}
