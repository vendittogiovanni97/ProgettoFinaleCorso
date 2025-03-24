export interface ChatListItem {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
  }

  export interface Person {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    isRead: boolean;
    unreadCount: number;
  }
  
  export interface Group {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
  }


  
  
  export interface Person extends ChatListItem {
    isRead: boolean;
  }

    export interface Group extends ChatListItem {
    isRead: boolean;
    }
  

   