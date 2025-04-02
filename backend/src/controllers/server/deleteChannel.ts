import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const deleteChannel = async (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);

  if (isNaN(channelId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID canale non valido"
    );
  }

  // Check if channel exists
  const channel = await dbClient.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Canale non trovato"
    );
  }

  // Delete channel
  await dbClient.channel.delete({
    where: { id: channelId },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Channel deleted successfully",
    responseStatus.OK,
    {}
  );
};
