import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  if (!requestId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID della richiesta obbligatorio"
    );
  }

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

  await dbClient.friendship.delete({
    where: { id: parseInt(requestId) },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Richiesta di amicizia rifiutata",
    responseStatus.OK,
    null
  );
};