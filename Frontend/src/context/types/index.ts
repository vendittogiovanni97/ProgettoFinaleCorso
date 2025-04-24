// src/types/index.ts

export interface User {
  id: number;
  username: string;
  avatar?: string | null;
  status?: "ONLINE" | "OFFLINE" | "AWAY" | "DO_NOT_DISTURB";
}

export interface DirectMessage {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  read: boolean;
  createdAt: Date;
}

export interface Channel {
  id: number;
  name: string;
  text: boolean;
  voice: boolean;
  video: boolean;
  serverId: number;
}

export interface ChannelMessage {
  id: number;
  content: string;
  userId: number;
  channelId: number;
  createdAt: Date;
}

export interface Server {
  id: number;
  name: string;
  icon?: string | null;
  ownerId: number;
}

export interface Friendship {
  id: number;
  userId: number;
  friendId: number;
  status: "PENDING" | "ACCEPTED" | "BLOCKED";
}
