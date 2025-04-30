import { Request, Response, NextFunction } from "express";

export class HttpError extends Error {
  status: number;

  constructor(input: { message?: string, status?: number }) {
    super(input.message ?? "Internal Server Error");
    this.status = input.status ?? 500;
  }
}

export class NotFoundError extends HttpError {
  constructor(input: { message?: string, status?: number }) {
    super({
      message: input.message,
      status: input.status ?? 404,
    });
  }
};

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.status).json({
    message: err.message,
  });
};
