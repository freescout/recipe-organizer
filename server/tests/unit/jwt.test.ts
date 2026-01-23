import jwt from "jsonwebtoken";
import { generateToken, verifyToken, Payload } from "../../src/utils/jwt";

const TEST_SECRET = "test-secret-key-for-jest";

describe("JWT Utility Functions", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = TEST_SECRET;
  });

  afterAll(() => {
    delete process.env.JWT_SECRET;
  });

  const mockPayload: Payload = {
    id: "abc123",
    email: "test@example.com",
  };

  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      const token = generateToken(mockPayload);

      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("should include exp and iat claims", () => {
      const token = generateToken(mockPayload);
      const decoded = jwt.decode(token);

      expect(decoded).not.toBeNull();

      const payload = decoded as jwt.JwtPayload;
      expect(payload).toHaveProperty("iat");
      expect(payload).toHaveProperty("exp");
      expect(payload.exp).toBeGreaterThan(payload.iat!);
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token and return the payload", () => {
      const token = generateToken(mockPayload);
      const verifiedPayload = verifyToken(token);

      expect(verifiedPayload).not.toBeNull();
      expect(verifiedPayload).toMatchObject({
        id: mockPayload.id,
        email: mockPayload.email,
      });
    });
    it.each([
      ["empty string", ""],
      ["invalid format", "invalid.token.value"],
      ["only two parts", "abc.def"],
    ])("should return null for %s", (_, invalidToken) => {
      const result = verifyToken(invalidToken);
      expect(result).toBeNull();
    });

    it("should return null for token with wrong signature", () => {
      const token = jwt.sign(mockPayload, "wrong-secret", {
        expiresIn: "1h",
      });
      const result = verifyToken(token);

      expect(result).toBeNull();
    });
    it("should return null for an expired token", async () => {
      const token = jwt.sign(mockPayload, TEST_SECRET, { expiresIn: "10ms" });

      // Wait just enough for it to expire
      await new Promise((res) => setTimeout(res, 50));

      const result = verifyToken(token);
      expect(result).toBeNull();
    });
  });
});
