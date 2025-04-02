import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Gli ID utente e amico sono obbligatori"
    );
  }

  // Check if users exist
  const user = await dbClient.user.findUnique({ where: { id: userId } });
  const friend = await dbClient.user.findUnique({ where: { id: friendId } });

  if (!user || !friend) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Utente non trovato"
    );
  }

  // Check if friendship already exists
  const existingFriendship = await dbClient.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (existingFriendship) {
    throw new AppError(
      responseStatus.CONFLICT,
      ErrorCodes.DUPLICATE_ENTITY,
      "Richiesta di amicizia già esistente"
    );
  }

  // Create friendship request
  const friendship = await dbClient.friendship.create({
    data: {
      userId,
      friendId,
      status: "PENDING",
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friend request sent successfully",
    responseStatus.CREATED,
    friendship
  );
};
