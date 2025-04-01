import { Router, Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

// Get all friends for a user
export const getFriends = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID utente non valido"
    );
  }

  // Fetch accepted friendships where the user is either the initiator or receiver
  const friendships = await dbClient.friendship.findMany({
    where: {
      OR: [
        { userId: userId, status: "ACCEPTED" },
        { friendId: userId, status: "ACCEPTED" },
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
          status: true,
        },
      },
      friend: {
        select: {
          id: true,
          username: true,
          avatar: true,
          status: true,
        },
      },
    },
  });

  // Format the response to get a clean list of friends
  const friends = friendships.map((friendship) => {
    // If the current user is the initiator, return friend info
    // Otherwise return user info
    return friendship.userId === userId ? friendship.friend : friendship.user;
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friends retrieved successfully",
    responseStatus.OK,
    friends
  );
};

// Get all pending friend requests for a user
export const getPendingRequests = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID utente non valido"
    );
  }

  // Fetch pending friendship requests where the user is the receiver
  const pendingRequests = await dbClient.friendship.findMany({
    where: {
      friendId: userId,
      status: "PENDING",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Pending requests retrieved successfully",
    responseStatus.OK,
    pendingRequests
  );
};

// Send a friend request
export const sendFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Gli ID utente e amico sono obbligatori"
    );
  }

  // Check if users exist
  const user = await dbClient.user.findUnique({ where: { id: userId } });
  const friend = await dbClient.user.findUnique({ where: { id: friendId } });

  if (!user || !friend) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Utente non trovato"
    );
  }

  // Check if friendship already exists
  const existingFriendship = await dbClient.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (existingFriendship) {
    throw new AppError(
      responseStatus.CONFLICT,
      ErrorCodes.DUPLICATE_ENTITY,
      "Richiesta di amicizia già esistente"
    );
  }

  // Create friendship request
  const friendship = await dbClient.friendship.create({
    data: {
      userId,
      friendId,
      status: "PENDING",
    },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friend request sent successfully",
    responseStatus.CREATED,
    friendship
  );
};

// Accept a friend request
export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  if (!requestId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID della richiesta obbligatorio"
    );
  }

  // Find the friendship request
  const friendship = await dbClient.friendship.findUnique({
    where: { id: parseInt(requestId) },
  });

  if (!friendship) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Richiesta di amicizia non trovata"
    );
  }

  // Update friendship status
  const updatedFriendship = await dbClient.friendship.update({
    where: { id: parseInt(requestId) },
    data: { status: "ACCEPTED" },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friend request accepted",
    responseStatus.OK,
    updatedFriendship
  );
};

// Reject/Delete a friend request or remove a friend
export const rejectOrRemoveFriend = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  if (!requestId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "ID della richiesta obbligatorio"
    );
  }

  // Find the friendship
  const friendship = await dbClient.friendship.findUnique({
    where: { id: parseInt(requestId) },
  });

  if (!friendship) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Amicizia non trovata"
    );
  }

  // Delete the friendship
  await dbClient.friendship.delete({
    where: { id: parseInt(requestId) },
  });

  AppSuccess.getInstance().successResponse(
    res,
    "Friendship removed successfully",
    responseStatus.OK,
    {}
  );
};

// Block a user
export const blockUser = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Gli ID utente e amico sono obbligatori"
    );
  }

  // Check if users exist
  const user = await dbClient.user.findUnique({ where: { id: userId } });
  const friend = await dbClient.user.findUnique({ where: { id: friendId } });

  if (!user || !friend) {
    throw new AppError(
      responseStatus.NOT_FOUND,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Utente non trovato"
    );
  }

  // Check if existing friendship
  const existingFriendship = await dbClient.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (existingFriendship) {
    // Update to blocked
    await dbClient.friendship.update({
      where: { id: existingFriendship.id },
      data: { status: "BLOCKED" },
    });
  } else {
    // Create new with blocked status
    await dbClient.friendship.create({
      data: {
        userId,
        friendId,
        status: "BLOCKED",
      },
    });
  }

  AppSuccess.getInstance().successResponse(
    res,
    "User blocked successfully",
    responseStatus.OK,
    {}
  );
};
