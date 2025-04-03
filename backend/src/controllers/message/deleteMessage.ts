import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const deleteMessage = async (req: Request, res: Response) => {
  const id = parseInt(req.params.messageId);

  if (isNaN(id)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID messaggio non valido"
    );
  }

  const deleteMessage = await dbClient.directMessage.findUnique({
    where: { id: id },
  });

  if (!deleteMessage) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "messaggio non eliminato"
    );
  }

  await dbClient.directMessage.delete({
    where: { id: id },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "message eliminato con successo",
    responseStatus.OK,
    {}
  );
};
