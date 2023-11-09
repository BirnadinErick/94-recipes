const bcrypt = require("bcrypt");
const { hash, validateHash } = require("../utils/password");

describe("password", () => {
  describe("hashPlainText", () => {
    it("should hash plain text password", async () => {
      const plaintext = "birnadinE|methebe.com|birn.cc";
      const hashValue = await hash(plaintext);

      expect(hashValue).not.toBe(plaintext);
      expect(bcrypt.compareSync(plaintext, hashValue)).toBe(true);
    });
  });

  describe("validateHash", () => {
    it("should validate hash against plain text", async () => {
      const plaintext = "birnadinE|methebe.com|birn.cc";
      const hashValue = await hash(plaintext);

      const isValid = await validateHash(hashValue, plaintext);

      expect(isValid).toBe(true);
    });

    it("should not validate invalid plain text", async () => {
      const plaintext = "birnadinE|methebe.com|birn.cc";
      const hashValue = await hash(plaintext);
      const invalidPlaintext = "arigatto";

      const isValid = await validateHash(hashValue, invalidPlaintext);

      expect(isValid).toBe(false);
    });
  });
});
