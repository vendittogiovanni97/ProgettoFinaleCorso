import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const createChannel = async (req: Request, res: Response) => {
  const { serverId, name, type } = req.body;

  if (!serverId || !name || !type) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server, nome e tipo canale sono obbligatori"
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

  // Create channel
  const channel = await dbClient.channel.create({
    data: {
      name,
      text: true,
      voice: true,
      video: true,
      serverId,
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Channel created successfully",
    responseStatus.CREATED,
    channel
  );
};
