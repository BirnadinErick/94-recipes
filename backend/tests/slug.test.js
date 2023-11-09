const { getSlug } = require("../utils/slug");

describe("getSlug", () => {
  it("should generate slug from title", () => {
    const title = "Birnadin Erick 12";
    const slug = getSlug(title);

    expect(slug).toBe("birnadin-erick-12");
  });

  it("should replace spaces with hyphens", () => {
    const title = "Birnadin Erick";
    const slug = getSlug(title);

    expect(slug).toBe("birnadin-erick");
  });

  it("should remove non-alphanumeric characters", () => {
    const title = "Hey There!";
    const slug = getSlug(title);

    expect(slug).toBe("hey-there");
  });

  it("should reduce multiple hyphens to one", () => {
    const title = "Tanjiro--Komoto";
    const slug = getSlug(title);

    expect(slug).toBe("tanjiro-komoto");
  });

  it("should trim leading/trailing hyphens", () => {
    const title = "-Nezuko-Shines-";
    const slug = getSlug(title);

    expect(slug).toBe("nezuko-shines");
  });
});
