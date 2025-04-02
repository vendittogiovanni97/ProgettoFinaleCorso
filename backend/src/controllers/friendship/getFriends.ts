import { Request, Response } from "express";
import dbClient from "../../configuration/db.config";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/status";
import { AppError } from "../../types/errorType";
import { AppSuccess } from "../../types/succesType";

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
