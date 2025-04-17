import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";

export const getServers = async (req: Request, res: Response) => {
  try {
    const servers = await dbClient.server.findMany({
      include: {
        channels: true,
        members: {
          include: {
            user: true, // Se vuoi anche i dati dell'utente membro
          },
        },
      },
    });

    AppSuccess.getInstance().successResponse(
      res,
      "Elenco dei server recuperato con successo",
      responseStatus.OK,
      servers
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
