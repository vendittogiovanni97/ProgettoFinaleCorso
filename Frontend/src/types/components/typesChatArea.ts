import { Message, Contact } from "./typesDashboard";

export interface MessageBubbleComponentProps {
  isUser: boolean;
  text: string;
  timestamp: Date;
}

export interface ChatAreaProps {
  currentChatId: number;
  currentChatName: string;
  isOnline: boolean;
  lastSeen: string;
  initialMessages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  contacts: Contact[];
}

export interface MessageInputProps {
  channelId?: number;
  isDirectMessage?: boolean;
  receiverId?: number;
  onMessageSent?: () => void; // callback opzionale per notificare il componente padre
}
