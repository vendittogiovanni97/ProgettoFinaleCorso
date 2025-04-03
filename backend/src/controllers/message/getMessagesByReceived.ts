import { Request, Response } from "express";
import { AppError } from "../../types/errorType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";
import dbClient from "../../configuration/db.config";
import { AppSuccess } from "../../types/succesType";

export const getMessagesByReceived = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;

    // Verifica che il received sia stato fornito
    if (!receiverId) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        "ID destinatario non fornito"
      );
    }

    // Verifica che l'utente destinatario esiste
    const receiverExists = await dbClient.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiverExists) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Utente destinatario non trovato"
      );
    }

    // Trova tutti i messaggi inviati dal destiatario
    const messages = await dbClient.directMessage.findMany({
      where: { receiverId },
      include: {
        sender: true, // Se vuoi anche i dati del destinatario nei risultati
      },
      orderBy: { createdAt: "desc" },
    });

    // Restituisci i messaggi trovati
    AppSuccess.getInstance().successResponse(
      res,
      "Messaggi del destinatario trovati con successo",
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
