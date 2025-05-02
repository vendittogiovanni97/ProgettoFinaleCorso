// src/services/chatService.ts

import {
  Channel,
  ChannelMessage,
  DirectMessage,
  Friendship,
  Server,
  User,
} from "../../context/types";
import backendFetch from "../api";
import { ChannelPermissions } from "../../types/components/typesDiscordSidebar";

// Funzione di aiuto per gestire errori nelle chiamate fetch
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Si è verificato un errore");
  }
  return response.json();
};

// API per la gestione degli utenti e amicizie
export const userService = {
  // Ottenere tutti gli amici
  getFriends: async (): Promise<User[]> => {
    const response = await fetch("/api/friends");
    return handleResponse(response);
  },

  // Ottenere le richieste di amicizia in sospeso
  getFriendRequests: async (): Promise<Friendship[]> => {
    const response = await fetch("/api/friends/requests");
    return handleResponse(response);
  },

  // Accettare una richiesta di amicizia
  acceptFriendRequest: async (friendshipId: number): Promise<Friendship> => {
    const response = await fetch(`/api/friends/accept/${friendshipId}`, {
      method: "PUT",
    });
    return handleResponse(response);
  },
};

// API per i messaggi diretti
export const directMessageService = {
  // Ottenere i messaggi con un utente specifico
  getMessages: async (userId: number): Promise<DirectMessage[]> => {
    const response = await fetch(`/api/messages/direct/${userId}`);
    return handleResponse(response);
  },

  // Inviare un messaggio diretto
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
interface ServerResponse {
  details: Server[];
  // altre proprietà se presenti
}
// API per server e canali
export const serverService = {
  // Ottenere tutti i server dell'utente
  getServers: async (): Promise<ServerResponse> => {
    try {
      const { responseBody } = await backendFetch("/servers/server");
      return responseBody.details || [];
    } catch (error) {
      console.error("Errore nel recupero degli amici : ", error);
      throw error;
    }
  },

  // Ottenere i canali di un server
  getChannels: async (serverId: number): Promise<Channel[]> => {
    try {
      const { responseBody } = await backendFetch(
        `/servers/${serverId}/channels`
      );
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
      return 'text'; // tipo di default
    }
  },

  getChannelPermissions: async (channelId: number): Promise<ChannelPermissions> => {
    try {
      const { responseBody } = await backendFetch(`/channels/${channelId}/permissions`);
      return responseBody.permissions;
    } catch (error) {
      console.error("Errore nel recupero dei permessi del canale:", error);
      return { read: true, write: true }; // permessi di default
    }
  }
};

// API per i messaggi nei canali
export const channelMessageService = {
  // Ottenere i messaggi di un canale
  getMessages: async (channelId: number): Promise<ChannelMessage[]> => {
    const response = await fetch(`/api/channels/${channelId}/messages`);
    return handleResponse(response);
  },

  // Inviare un messaggio a un canale
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
