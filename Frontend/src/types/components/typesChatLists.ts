export interface Contact {
    id: number;
    name: string;
    status: string;
    avatar: string;
    lastSeen: string;
    isOnline: boolean;
  }

  
export interface Group {
    id: number;
    name: string;
    description: string;
    avatar: string;
    lastActive: string;
  }
  
export interface ChatListsProps {
    contacts: Contact[];
    groups: Group[];
    onSelectChat: (id: number, isGroup: boolean, name: string) => void;
    activeChatId: number;
  }
  