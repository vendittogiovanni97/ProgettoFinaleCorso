import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";
import { Prisma } from "@prisma/client";

export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { content, senderId, receiverId } = req.body;

    // Validazione avanzata
    if (!content?.trim() || !senderId?.trim() || !receiverId?.trim()) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        "Contenuto, mittente e destinatario sono obbligatori"
      );
    }

    // Verifica esistenza utenti (query parallela)
    const [sender, receiver] = await Promise.all([
      dbClient.user.findUnique({ where: { id: senderId } }),
      dbClient.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender || !receiver) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Uno o più utenti non trovati"
      );
    }

    // Creazione messaggio
    const message = await dbClient.directMessage.create({
      data: {
        content: content.trim(),
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });

    // Risposta di successo
    AppSuccess.getInstance().successResponse(
      res,
      "Messaggio inviato con successo",
      responseStatus.CREATED,
      message
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.DATABASE_CONNECTION_ERROR,
        "Errore nel salvataggio del messaggio"
      );
    }
    throw error; // Gestione centralizzata degli errori
  }
}
