import { Request } from "express";

export function assertAuthenticated(
  req: Request
): asserts req is Request & { user: { id: string } } {
  if (!req.user?.id) {
    throw new Error("User not authenticated");
  }
}
