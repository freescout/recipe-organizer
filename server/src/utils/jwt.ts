import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const EXPIRATION_TIME = process.env.JWT_EXPIRES_IN || "1h";

export interface Payload {
  id: string;
  email: string;
}

export const generateToken = (payload: Payload): string => {
  const options: jwt.SignOptions = {
    expiresIn: EXPIRATION_TIME as any,
  };
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string): Payload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as Payload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
