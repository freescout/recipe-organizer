import { Response } from "express";

export function handleError(res: Response, error: unknown, context: string) {
  const err = error as Error;
  res.status(500).json({
    message: `Error ${context}`,
    error: err.message,
  });
}
