import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const deleteServer = async (req: Request, res: Response) => {
  const serverId = parseInt(req.params.serverId);

  if (isNaN(serverId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server non valido"
    );
  }

  // Check if server exists
  const server = await dbClient.server.findUnique({
    where: { id: serverId },
  });

  if (!server) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Server non trovato"
    );
  }

  // Delete server (this will cascade delete channels and memberships)
  await dbClient.server.delete({
    where: { id: serverId },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server deleted successfully",
    responseStatus.OK,
    {}
  );
};
