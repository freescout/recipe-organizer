import { Request } from "express";
import { verifyToken } from "./jwt";

export const patchUserFromToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (decoded) {
      (req as any).user = decoded;
    }
  }
};
