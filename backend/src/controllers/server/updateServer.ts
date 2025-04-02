import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const updateServer = async (req: Request, res: Response) => {
  const serverId = parseInt(req.params.serverId);
  const { name, icon } = req.body;

  if (isNaN(serverId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server non valido"
    );
  }

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

  // Update server
  const updatedServer = await dbClient.server.update({
    where: { id: serverId },
    data: {
      name: name ?? server.name,
      icon: icon ?? server.icon,
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server updated successfully",
    responseStatus.OK,
    updatedServer
  );
};
