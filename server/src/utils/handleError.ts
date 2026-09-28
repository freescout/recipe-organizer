import { Response } from "express";
import mongoose from "mongoose";

export function handleError(res: Response, error: unknown, context: string) {
  // Duplicate key (MongoServerError, not a Mongoose error)
  const mongoErr = error as {
    code?: number;
    keyValue?: Record<string, unknown>;
  };
  if (mongoErr?.code === 11000 && mongoErr.keyValue) {
    const field = Object.keys(mongoErr.keyValue)[0];
    return res.status(409).json({
      message: `Duplicate value for field '${field}'`,
      field,
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: `Validation error ${context}`,
      errors: Object.values(error.errors).map((e) => e.message),
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: `Invalid ${error.path} ${context}`,
    });
  }

  const err = error as Error;
  return res.status(500).json({
    message: `Error ${context}`,
    error: err.message,
  });
}
