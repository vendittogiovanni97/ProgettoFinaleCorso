export interface Server {
  id: number;
  name: string;
  avatar: string;
  ownerId?: number;
  unreadCount?: number;
}

export interface ChannelPermissions {
  read: boolean;
  write: boolean;
}

export interface ChannelListProps {
  serverId: number;
  onChannelSelect: (channelId: string, channelName: string) => void;
}

export interface Channel {
  id: string;
  name: string;
  text?: boolean;
  voice?: boolean;
  video?: boolean;
  isActive?: boolean;
  type?: string;
  permissions?: ChannelPermissions;
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
