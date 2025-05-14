import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
}

declare module "express" {
  export interface Request {
    user?: AuthPayload;
  }
}
