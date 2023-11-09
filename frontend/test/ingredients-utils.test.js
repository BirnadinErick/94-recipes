import { createIngredients } from "../src/utils/ingrediants";
import { describe, it, expect } from "vitest";

describe("createIngredients", () => {
  it("should parse ingredients correctly", () => {
    const input = "Ingredient1 100g\nIngredient2 200g\nIngredient3 300g";
    const expectedOutput = [
      { Ingredient1: "100g" },
      { Ingredient2: "200g" },
      { Ingredient3: "300g" },
    ];

    expect(createIngredients(input)).toEqual(expectedOutput);
  });

  it("should handle edge cases with extra whitespace and multiple amounts", () => {
    const input =
      "Ingredient1 100g extra 50g\nIngredient2\nIngredient3 300g 200g";
    const expectedOutput = [
      { Ingredient1: "100g" },
      { Ingredient2: undefined },
      { Ingredient3: "300g" },
    ];

    expect(createIngredients(input)).toEqual(expectedOutput);
  });

  it("should handle an empty input", () => {
    const input = "";
    const expectedOutput = [{ "": undefined }];

    expect(createIngredients(input)).toEqual(expectedOutput);
  });
});
