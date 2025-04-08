// errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/errorType";
import { responseStatus } from "../constants/status";
import { ErrorCodes } from "../constants/errorCodes";

// Definisci il tipo per il middleware di errore
type ErrorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);

  // Gestione errori personalizzata
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      details: err.details,
    });
  }

  // Gestione errori Prisma
  if (err.name === "PrismaClientKnownRequestError") {
    const prismaError = err as any;
    if (prismaError.code === "P2002") {
      const error = new AppError(
        responseStatus.CONFLICT,
        ErrorCodes.INVALID_CREDENTIALS,
        `Email e password già esistenti`
      );
      next(error);
    }
  }

  // Errore generico (fallback)
  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Si è verificato un errore interno",
    next() {},
  });
};
