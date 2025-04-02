import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

export const addMemberToServer = async (req: Request, res: Response) => {
  const { serverId, userId, role } = req.body;

  if (!serverId || !userId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server e ID utente sono obbligatori"
    );
  }

  // Check if server and user exist
  const server = await dbClient.server.findUnique({ where: { id: serverId } });
  const user = await dbClient.user.findUnique({ where: { id: userId } });

  if (!server || !user) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Server o utente non trovato"
    );
  }

  // Check if user is already a member
  const existingMember = await dbClient.serverMember.findUnique({
    where: {
      userId_serverId: {
        userId,
        serverId,
      },
    },
  });

  if (existingMember) {
    throw new AppError(
      responseStatus.CONFLICT,
      ErrorCodes.DUPLICATE_ENTITY,
      "L'utente è già un membro di questo server"
    );
  }

  // Add user to server
  const member = await dbClient.serverMember.create({
    data: {
      userId,
      serverId,
      role: role || "MEMBER",
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Member added successfully",
    responseStatus.CREATED,
    member
  );
};
