import { Request, Response } from "express";
import { AppError } from "../../types/errorType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";
import dbClient from "../../configuration/db.config";
import { AppSuccess } from "../../types/succesType";

export const getMessagesBySender = async (req: Request, res: Response) => {
  try {
    const { senderId } = req.body;

    // Verifica che il senderId sia stato fornito
    if (!senderId) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        "ID mittente non fornito"
      );
    }

    // Verifica che l'utente mittente esiste
    const senderExists = await dbClient.user.findUnique({
      where: { id: senderId },
    });

    if (!senderExists) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Utente mittente non trovato"
      );
    }

    // Trova tutti i messaggi inviati dal mittente
    const messages = await dbClient.directMessage.findMany({
      where: { senderId },
      include: {
        sender: true, // Se vuoi anche i dati del mittente nei risultati
      },
      orderBy: { createdAt: "desc" },
    });

    // Restituisci i messaggi trovati
    AppSuccess.getInstance().successResponse(
      res,
      "Messaggi del mittente trovati con successo",
      responseStatus.OK,
      messages
    );
  } catch (error) {
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.NETWORK_ERROR,
      "Errore nel server"
    );
  }
};
