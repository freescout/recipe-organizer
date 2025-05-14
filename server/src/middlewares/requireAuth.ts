import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("JWT error:", error);
    }
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
