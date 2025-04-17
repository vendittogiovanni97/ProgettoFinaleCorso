export interface Server {
  id: string;
  name: string;
  avatar: string;
  ownerId?: number;
  unreadCount?: number;
}

export interface Channel {
  id: string;
  name: string;
  text: boolean;
  voice: boolean;
  video: boolean;
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

export interface DiscordSidebarProps {
  onChannelSelect?: (channelId: string, channelName: string) => void;
}
export interface ServerIconProps {
  server: Server;
  isActive: boolean;
  onClick: () => void;
}
