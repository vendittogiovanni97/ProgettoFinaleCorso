import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { AppSuccess } from "../../types/succesType";
import { AppError } from "../../types/errorType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";

export const searchUsers = async (req: Request, res: Response) => {
  const { query, currentUserId } = req.query;

  if (!query || typeof query !== "string") {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Parametro di ricerca mancante"
    );
  }

  // currentUserId può essere passato come query param oppure preso dalla sessione
  const excludeId = currentUserId ? parseInt(currentUserId as string) : undefined;

  const users = await dbClient.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { username: { contains: query } },  // Removed mode: "insensitive"
            { email: { contains: query } }     // Removed mode: "insensitive"
          ]
        },
        excludeId ? { id: { not: excludeId } } : {}
      ]
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
    }
  });

  // Filter results case-insensitively
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );

  AppSuccess.getInstance().successResponse(
    res,
    "Utenti trovati",
    responseStatus.OK,
    filteredUsers
  );
};