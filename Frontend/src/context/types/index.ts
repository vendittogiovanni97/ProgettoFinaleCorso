// src/types/index.ts

export interface Message {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: Date;
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  lastSeen: string;
  isOnline: boolean;
  icon: string;
  phone: string;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  lastActive: string;
  avatar: string;
}
