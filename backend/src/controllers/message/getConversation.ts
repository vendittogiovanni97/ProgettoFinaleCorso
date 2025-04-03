// conversation.controller.ts
import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";
import { Prisma } from "@prisma/client";
import { responseStatus } from "../../constants/status";

export const getConversation = async (req: Request, res: Response) => {
  try {
    const { user1, user2 } = req.query;

    // Validazione input
    const userId1 = parseInt(user1 as string, 10);
    const userId2 = parseInt(user2 as string, 10);

    if (isNaN(userId1) || isNaN(userId2)) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        "ID utenti non validi"
      );
    }

    // Verifica esistenza utenti
    const [userA, userB] = await Promise.all([
      dbClient.user.findUnique({ where: { id: userId1 } }),
      dbClient.user.findUnique({ where: { id: userId2 } }),
    ]);

    if (!userA || !userB) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Uno o più utenti non trovati"
      );
    }

    // Configurazione paginazione
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Query conversazione
    const whereCondition: Prisma.DirectMessageWhereInput = {
      OR: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    };

    const [messages, totalMessages] = await Promise.all([
      dbClient.directMessage.findMany({
        where: whereCondition,
        select: {
          id: true,
          content: true,
          senderId: true,
          receiverId: true,
          read: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
        skip,
        take: limit,
      }),
      dbClient.directMessage.count({ where: whereCondition }),
    ]);

    // Formattazione risposta
    AppSuccess.getInstance().successResponse(
      res,
      "Conversazione ottenuta con successo",
      responseStatus.OK,
      {
        messages: messages.map((msg) => ({
          ...msg,
          createdAt: msg.createdAt.toISOString(),
        })),
        pagination: {
          total: totalMessages,
          page,
          limit,
          totalPages: Math.ceil(totalMessages / limit),
        },
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(
        responseStatus.INTERNAL_SERVER_ERROR,
        ErrorCodes.DATABASE_ERROR,
        "Errore nel recupero messaggi"
      );
    }
    throw error;
  }
};
