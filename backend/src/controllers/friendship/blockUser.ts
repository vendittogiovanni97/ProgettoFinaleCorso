import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const blockUser = async (req: Request, res: Response) => {
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

  // Check if existing friendship
  const existingFriendship = await dbClient.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (existingFriendship) {
    // Update to blocked
    await dbClient.friendship.update({
      where: { id: existingFriendship.id },
      data: { status: "BLOCKED" },
    });
  } else {
    // Create new with blocked status
    await dbClient.friendship.create({
      data: {
        userId,
        friendId,
        status: "BLOCKED",
      },
    });
  }

  AppSuccess.getInstance().successResponse(
    res,
    "User blocked successfully",
    responseStatus.OK,
    {}
  );
};
