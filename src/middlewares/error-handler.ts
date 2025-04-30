import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

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

const getHttpError = (error: Error): HttpError => {
  if (error instanceof HttpError) {
    return error;
  } else if (error instanceof ZodError) {
    return new HttpError({
      message: (error as ZodError).message,
      status: 400,
    });
  }

  return new HttpError({
    message: error.message,
  });
};

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const httpError = getHttpError(error);
  console.log(httpError);

  response.status(httpError.status).json({
    message: httpError.message,
  });
};
