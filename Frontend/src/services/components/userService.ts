import { User, Friendship } from "../../context/types";
import handleResponse from "./utils";
const userService = {
  getFriends: async (): Promise<User[]> => {
    const response = await fetch("/api/friends");
    return handleResponse(response);
  },

  getFriendRequests: async (): Promise<Friendship[]> => {
    const response = await fetch("/api/friends/requests");
    return handleResponse(response);
  },

  acceptFriendRequest: async (friendshipId: number): Promise<Friendship> => {
    const response = await fetch(`/api/friends/accept/${friendshipId}`, {
      method: "PUT",
    });
    return handleResponse(response);
  },

  searchUsers: async (query: string, currentUserId: number) => {
    const res = await fetch(`/api/users/search?query=${encodeURIComponent(query)}&exclude=${currentUserId}`);
    return await res.json();
  },
};

export default userService;