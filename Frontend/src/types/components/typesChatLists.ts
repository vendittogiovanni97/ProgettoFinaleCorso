export interface Contact {
  id: number;
  name: string;
  isOnline: boolean;
  status: string;
  lastSeen: string;
  unreadCount?: number; // Added unreadCount property
  avatar: string;
  phone: string;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  lastActive: string;
  unreadCount?: number; // Add unreadCount as an optional property
  avatar: string;
}

export interface ChatListsProps {
  contacts: Contact[];
  groups: Group[];
  onSelectChat: (id: number, isGroup: boolean, name: string) => void;
  activeChatId: number;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}
