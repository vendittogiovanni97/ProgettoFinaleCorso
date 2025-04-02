import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const getUserServers = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID utente non valido"
    );
  }

  const servers = await dbClient.server.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: { members: true },
      },
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Servers retrieved successfully",
    responseStatus.OK,
    servers
  );
};
