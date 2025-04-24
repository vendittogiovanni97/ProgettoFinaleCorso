import { Contact, Group, Message } from ".";

export interface ChatContextType {
  // Dati
  messages: Message[];
  contacts: Contact[];
  groups: Group[];
  channelMessages: Record<string, Message[]>;

  // Stato corrente
  currentChatId: number;
  currentChatName: string;
  isOnline: boolean;
  lastSeen: string;
  isGroup: boolean;
  showChatList: boolean;

  // Funzioni
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChannelMessages: React.Dispatch<
    React.SetStateAction<Record<string, Message[]>>
  >;
  selectChat: (id: number, isGroup: boolean, name: string) => void;
  sendMessage: (text: string) => void;
  toggleChatList: () => void;
  selectDiscordChannel: (channelId: string, channelName: string) => void;
}

// Valori di default per il context
export const defaultContextValue: ChatContextType = {
  messages: [],
  contacts: [],
  groups: [],
  channelMessages: {},
  currentChatId: 0,
  currentChatName: "",
  isOnline: false,
  lastSeen: "",
  isGroup: false,
  showChatList: true,
  setMessages: () => {},
  setChannelMessages: () => {},
  selectChat: () => {},
  sendMessage: () => {},
  toggleChatList: () => {},
  selectDiscordChannel: () => {},
};
