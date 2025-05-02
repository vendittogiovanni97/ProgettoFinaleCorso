import { DirectMessage } from "../../context/types";
import handleResponse from "./utils";

const directMessageService = {
  getMessages: async (userId: number): Promise<DirectMessage[]> => {
    const response = await fetch(`/api/messages/direct/${userId}`);
    return handleResponse(response);
  },

  sendMessage: async (
    receiverId: number,
    content: string
  ): Promise<DirectMessage> => {
    const response = await fetch("/api/messages/direct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, content }),
    });
    return handleResponse(response);
  },
};
export default directMessageService;
