import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { AppSuccess } from "../../types/succesType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";
import { AppError } from "../../types/errorType";

export const getChannelsByServer = async (req: Request, res: Response) => {
  const { serverId } = req.params;

  try {
    const channels = await dbClient.channel.findMany({
      where: {
        serverId: parseInt(serverId),
      },
    });
    AppSuccess.getInstance().successResponse(
      res,
      "Elenco dei channel recuperato",
      responseStatus.OK,
      channels
    );
  } catch (error) {
    console.error("Errore durante il recupero dei server:", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.INTERNAL_SERVER_ERROR,
      "Errore durante il recupero dei server"
    );
  }
};
