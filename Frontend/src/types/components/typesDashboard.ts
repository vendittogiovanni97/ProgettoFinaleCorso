export interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
  phone: string;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  avatar: string;
  lastActive: string;
}

export interface SharedMedia {
  id: number;
  type: "image" | "document" | "link";
  preview: string;
  name?: string;
  timestamp: Date;
  size?: string;
}

export interface ResponsiveAppBarProps {
  onMenuClick: () => void;  
}
