import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  if (!requestId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID della richiesta obbligatorio"
    );
  }

  // Find the friendship request
  const friendship = await dbClient.friendship.findUnique({
    where: { id: parseInt(requestId) },
  });

  if (!friendship) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Richiesta di amicizia non trovata"
    );
  }

  // Update friendship status
  const updatedFriendship = await dbClient.friendship.update({
    where: { id: parseInt(requestId) },
    data: { status: "ACCEPTED" },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friend request accepted",
    responseStatus.OK,
    updatedFriendship
  );
};
