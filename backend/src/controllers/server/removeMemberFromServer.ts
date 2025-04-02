import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const removeMemberFromServer = async (req: Request, res: Response) => {
  const { serverId, userId } = req.params;

  if (!serverId || !userId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server e ID utente sono obbligatori"
    );
  }

  // Check if membership exists
  const membership = await dbClient.serverMember.findUnique({
    where: {
      userId_serverId: {
        userId: parseInt(userId),
        serverId: parseInt(serverId),
      },
    },
  });

  if (!membership) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Membership non trovata"
    );
  }

  // Delete membership
  await dbClient.serverMember.delete({
    where: {
      userId_serverId: {
        userId: parseInt(userId),
        serverId: parseInt(serverId),
      },
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Member removed successfully",
    responseStatus.OK,
    {}
  );
};
