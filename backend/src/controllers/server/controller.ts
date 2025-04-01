import { Router, Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

// Get all servers for a user
export const getUserServers = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID utente non valido"
    );
  }

  // Find servers where user is a member
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

// Get server details
export const getServerDetails = async (req: Request, res: Response) => {
  const serverId = parseInt(req.params.serverId);

  if (isNaN(serverId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server non valido"
    );
  }

  const server = await dbClient.server.findUnique({
    where: { id: serverId },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      channels: true,
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
              status: true,
            },
          },
        },
      },
    },
  });

  if (!server) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Server non trovato"
    );
  }

  AppSuccess.getInstance().successResponse(
    res,
    "Server details retrieved successfully",
    responseStatus.OK,
    server
  );
};

// Create a new server
export const createServer = async (req: Request, res: Response) => {
  const { name, ownerId, icon } = req.body;

  if (!name || !ownerId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Il nome del server e l'ID del proprietario sono obbligatori"
    );
  }

  // Check if user exists
  const user = await dbClient.user.findUnique({
    where: { id: ownerId },
  });

  if (!user) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Utente non trovato"
    );
  }

  // Create server with initial text channel
  const server = await dbClient.$transaction(async (prisma) => {
    // Create the server
    const server = await prisma.server.create({
      data: {
        name,
        ownerId,
        icon,
        // Add default channel "general"
        channels: {
          create: {
            name: "general",
            type: "TEXT",
          },
        },
        // Add owner as member with ADMIN role
        members: {
          create: {
            userId: ownerId,
            role: "ADMIN",
          },
        },
      },
      include: {
        channels: true,
        members: true,
      },
    });

    return server;
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server created successfully",
    responseStatus.CREATED,
    server
  );
};

// Update a server
export const updateServer = async (req: Request, res: Response) => {
  const serverId = parseInt(req.params.serverId);
  const { name, icon } = req.body;

  if (isNaN(serverId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server non valido"
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

  // Update server
  const updatedServer = await dbClient.server.update({
    where: { id: serverId },
    data: {
      name: name ?? server.name,
      icon: icon ?? server.icon,
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server updated successfully",
    responseStatus.OK,
    updatedServer
  );
};

// Delete a server
export const deleteServer = async (req: Request, res: Response) => {
  const serverId = parseInt(req.params.serverId);

  if (isNaN(serverId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server non valido"
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

  // Delete server (this will cascade delete channels and memberships)
  await dbClient.server.delete({
    where: { id: serverId },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Server deleted successfully",
    responseStatus.OK,
    {}
  );
};

// Add a user to a server
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

// Remove a member from a server
export const removeMemberFromServer = async (req: Request, res: Response) => {
  const { serverId, userId } = req.params;

  if (!serverId || !userId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID server e ID utente sono obbligatori"
    );
  }

  // Check if membership exists
  const membership = await dbClient.serverMember.findUnique({
    where: {
      userId_serverId: {
        userId: parseInt(userId),
        serverId: parseInt(serverId),
      },
    },
  });

  if (!membership) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Membership non trovata"
    );
  }

  // Delete membership
  await dbClient.serverMember.delete({
    where: {
      userId_serverId: {
        userId: parseInt(userId),
        serverId: parseInt(serverId),
      },
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Member removed successfully",
    responseStatus.OK,
    {}
  );
};

// Create a new channel in a server
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
      type: type as "TEXT" | "VOICE",
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

// Delete a channel
export const deleteChannel = async (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);

  if (isNaN(channelId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID canale non valido"
    );
  }

  // Check if channel exists
  const channel = await dbClient.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Canale non trovato"
    );
  }

  // Delete channel
  await dbClient.channel.delete({
    where: { id: channelId },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Channel deleted successfully",
    responseStatus.OK,
    {}
  );
};
