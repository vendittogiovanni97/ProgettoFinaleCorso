import { ChannelMessage } from "../../context/types";
import handleResponse from "./utils";

const channelMessageService = {
  getMessages: async (channelId: number): Promise<ChannelMessage[]> => {
    const response = await fetch(`/api/channels/${channelId}/messages`);
    return handleResponse(response);
  },

  sendMessage: async (
    channelId: number,
    content: string
  ): Promise<ChannelMessage> => {
    const response = await fetch(`/api/channels/${channelId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    return handleResponse(response);
  },
};
export default channelMessageService;
