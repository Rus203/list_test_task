import { CustomError } from '@/errors/custom.error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function globalErrorHandleMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode =
    error instanceof CustomError
      ? error.status
      : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).send({ message: error.message });
}
