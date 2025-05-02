import { Server, Channel } from "../../context/types";
import { ChannelPermissions } from "../../types/components/typesDiscordSidebar";
import backendFetch from "../api";

const serverService = {
  getServers: async (): Promise<Server[]> => {
    try {
      const { responseBody } = await backendFetch("/servers/server");
      return responseBody.details || [];
    } catch (error) {
      console.error("Errore nel recupero dei server:", error);
      throw error;
    }
  },

  getChannels: async (serverId: number): Promise<Channel[]> => {
    try {
      const { responseBody } = await backendFetch(`/servers/${serverId}/channels`);
      return responseBody.details || [];
    } catch (error) {
      console.error("Errore nel recupero dei canali:", error);
      throw error;
    }
  },

  getChannelType: async (channelId: number): Promise<string> => {
    try {
      const { responseBody } = await backendFetch(`/channels/${channelId}/type`);
      return responseBody.type;
    } catch (error) {
      console.error("Errore nel recupero del tipo di canale:", error);
      return 'text';
    }
  },

  getChannelPermissions: async (channelId: number): Promise<ChannelPermissions> => {
    try {
      const { responseBody } = await backendFetch(`/channels/${channelId}/permissions`);
      return responseBody.permissions;
    } catch (error) {
      console.error("Errore nel recupero dei permessi del canale:", error);
      return { read: true, write: true };
    }
  }
};
export default serverService;