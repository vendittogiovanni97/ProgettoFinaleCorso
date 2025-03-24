export interface Server {
  id: string;
  name: string;
  avatar: string;
  unreadCount?: number;
}

export interface Channel {
  id: string;
  name: string;
  type: 'voice';
  isActive?: boolean;
}

export interface ServerIconProps {
    server: Server;
    isActive: boolean;
    onClick: () => void;
  }

export interface CategoryProps {
  name: string;
  channels: Channel[];
  isCollapsed: boolean;
  onToggle: () => void;
  onSelectChannel: (channel: Channel) => void;
  activeChannelId: string | null;
}

export  interface DiscordSidebarProps {
  onChannelSelect: (channelId: string, channelName: string) => void;
}
export interface ServerIconProps {
  server: Server;
  isActive: boolean;
  onClick: () => void;
}

export interface MinimizedChatProps {
  username: string;
  isConnected: boolean;
  onToggleChat: () => void;
}