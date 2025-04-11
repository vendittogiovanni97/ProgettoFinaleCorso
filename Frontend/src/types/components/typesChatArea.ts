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
  channelMessages: Record<string, Message[]>;
  setChannelMessages: React.Dispatch<
    React.SetStateAction<Record<string, Message[]>>
  >;
}
