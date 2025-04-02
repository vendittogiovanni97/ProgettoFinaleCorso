import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const createServer = async (req: Request, res: Response) => {
  const { name, ownerId, icon } = req.body;

  if (!name || !ownerId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Il nome del server e l'ID del proprietario sono obbligatori"
    );
  }

  // Check if user exists
  const user = await dbClient.user.findUnique({
    where: { id: ownerId },
  });

  if (!user) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Utente non trovato"
    );
  }

  // Create server with initial text channel
  const server = await dbClient.$transaction(async (prisma) => {
    // Create the server
    const server = await prisma.server.create({
      data: {
        name,
        ownerId,
        icon,
        // Add default channel "general"
        channels: {
          create: {
            name: "general",
            type: "TEXT",
          },
        },
        // Add owner as member with ADMIN role
        members: {
          create: {
            userId: ownerId,
            role: "ADMIN",
          },
        },
      },
      include: {
        channels: true,
        members: true,
      },
    });

    return server;
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server created successfully",
    responseStatus.CREATED,
    server
  );
};
