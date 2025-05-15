import jwt from "jsonwebtoken";
import { generateToken, verifyToken, Payload } from "../../src/utils/jwt";
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

describe("JWT Utility Functions", () => {
  const mockPayload: Payload = {
    id: "abc123",
    email: "test@example.com",
  };

  it("should generate a valid token", () => {
    const token = generateToken(mockPayload);
    expect(typeof token).toBe("string");
    expect(token).toBeTruthy();
  });

  it("should verify a valid token and return the payload", () => {
    const token = generateToken(mockPayload);
    const verifiedPayload = verifyToken(token);
    expect(verifiedPayload).toMatchObject(mockPayload);
  });

  it("should return null for an invalid token", () => {
    const invalidToken = "invalid.token.value";
    const result = verifyToken(invalidToken);
    expect(result).toBeNull();
  });

  it("should return null for an expired token", async () => {
    const token = jwt.sign(mockPayload, SECRET_KEY, { expiresIn: "1ms" });

    // Wait just enough for it to expire
    await new Promise((res) => setTimeout(res, 10));

    const result = verifyToken(token);
    expect(result).toBeNull();
  });
});
