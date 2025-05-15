import { slugify } from "../../src/utils/slugify";

describe("slugify utility", () => {
  it("should convert text to lowercase and replace spaces with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("Hello@World!")).toBe("hello-world");
  });

  it("should trim leading and trailing spaces", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  it("should replace multiple spaces with a single hyphen", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("should replace multiple hyphens with a single hyphen", () => {
    expect(slugify("Hello---World")).toBe("hello-world");
  });

  it("should handle empty strings", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle strings with only special characters", () => {
    expect(slugify("@#$%^&*")).toBe("");
  });

  it("should handle strings with only spaces", () => {
    expect(slugify("     ")).toBe("");
  });

  it("should handle strings with mixed cases", () => {
    expect(slugify("HeLLo WoRLd")).toBe("hello-world");
  });

  it("should handle strings with numbers", () => {
    expect(slugify("Recipe 101")).toBe("recipe-101");
  });
});
