import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "../../src/middlewares/requireAuth";

jest.mock("jsonwebtoken");

describe("requireAuth middleware", () => {
  const mockRequest = (
    headers: Record<string, string | undefined>
  ): Partial<Request> => ({
    headers,
  });

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no authorization header is provided", () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNext;

    requireAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing or invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if authorization header does not start with 'Bearer '", () => {
    const req = mockRequest({ authorization: "InvalidToken" });
    const res = mockResponse();
    const next = mockNext;

    requireAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing or invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const req = mockRequest({ authorization: "Bearer invalidToken" });
    const res = mockResponse();
    const next = mockNext;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    requireAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    const req = mockRequest({ authorization: "Bearer validToken" });
    const res = mockResponse();
    const next = mockNext;

    const mockDecoded = { id: "123", email: "test@example.com" };
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

    requireAuth(req as Request, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith("validToken", expect.any(String));
    expect(req.user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
  });
});
