import React from "react";
import { useState } from "react";
import "../../css/DiscordSidebar.css";
import {
  CategoryProps,
  ServerIconProps,
  MinimizedChatProps,
  DiscordSidebarProps,
  Server,
  Channel,
} from "../../types/components/typesDiscordSidebar";

const Category: React.FC<CategoryProps> = ({
  name,
  channels,
  isCollapsed,
  onToggle,
  onSelectChannel,
  activeChannelId,
}) => {
  return (
    <div className="discord-category">
      <div className="discord-category-header" onClick={onToggle}>
        <span className="discord-category-arrow">
          {isCollapsed ? "▸" : "▾"}
        </span>
        <span className="discord-category-name">{name}</span>
      </div>
      {!isCollapsed && (
        <div className="discord-channel-list">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`discord-channel ${activeChannelId === channel.id ? "active" : ""}`}
              onClick={() => onSelectChannel(channel)}
            >
              <span className="discord-channel-icon"> 🔊</span>
              <span className="discord-channel-name">{channel.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ServerIcon: React.FC<ServerIconProps> = ({
  server,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`discord-server-icon ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {server.avatar ? (
        <img src={server.avatar} alt={server.name} />
      ) : (
        <div className="discord-server-initial">{server.name.charAt(0)}</div>
      )}
      {server.unreadCount && (
        <div className="discord-unread-badge">{server.unreadCount}</div>
      )}
    </div>
  );
};

const MinimizedChat: React.FC<MinimizedChatProps> = ({
  username,
  isConnected,
  onToggleChat,
}) => {
  return (
    <div className="discord-minimized-chat">
      <div className="discord-user-area">
        <div className="discord-user-avatar">{username.charAt(0)}</div>
        <div className="discord-user-details">
          <div className="discord-username">{username}</div>
          <div className="discord-status">
            {isConnected ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="discord-chat-controls">
        <button className="discord-chat-button">
          <span role="img" aria-label="microphone">
            🎤
          </span>
        </button>
        <button className="discord-chat-button">
          <span role="img" aria-label="headphones">
            🎧
          </span>
        </button>
        <button className="discord-chat-button" onClick={onToggleChat}>
          <span role="img" aria-label="settings">
            ⚙️
          </span>
        </button>
      </div>
    </div>
  );
};

const DiscordSidebar: React.FC<DiscordSidebarProps> = ({ onChannelSelect }) => {
  const [servers] = useState<Server[]>([
    { id: "server1", name: "Server Progetto", avatar: "", unreadCount: 1 },
    { id: "server2", name: "D's", avatar: "", unreadCount: 2 },
    { id: "server3", name: "Gaming", avatar: "", unreadCount: 30 },
    { id: "server4", name: "Work", avatar: "", unreadCount: 4 },
  ]);

  const [categories] = useState([
    {
      id: "cat1",
      name: "CANALI VOCALI",
      channels: [
        { id: "channel3", name: "Lobby", type: "voice" as const },
        { id: "channel4", name: "PrimaStanza", type: "voice" as const },
      ],
    },
  ]);

  const [activeServer, setActiveServer] = useState("server1");
  const [activeChannel, setActiveChannel] = useState<string | null>("channel1");
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  const handleServerSelect = (serverId: string) => {
    setActiveServer(serverId);
  };

  const handleChannelSelect = (channel: Channel) => {
    setActiveChannel(channel.id);
    onChannelSelect(channel.id, channel.name);
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <div className="discord-sidebar-container">
      <div className="discord-server-list">
        {servers.map((server) => (
          <ServerIcon
            key={server.id}
            server={server}
            isActive={activeServer === server.id}
            onClick={() => handleServerSelect(server.id)}
          />
        ))}
        <div className="discord-server-icon add-server">
          <span>+</span>
        </div>
        <div className="discord-server-icon explore">
          <span role="img" aria-label="explore">
            🔍
          </span>
        </div>
      </div>

      <div className="discord-channel-sidebar">
        <div className="discord-server-header">
          <h3>Server Progetto</h3>
          <span className="server-dropdown">▾</span>
        </div>

        <div className="discord-categories">
          {categories.map((category) => (
            <Category
              key={category.id}
              name={category.name}
              channels={category.channels}
              isCollapsed={!!collapsedCategories[category.id]}
              onToggle={() => toggleCategory(category.id)}
              onSelectChannel={handleChannelSelect}
              activeChannelId={activeChannel}
            />
          ))}
        </div>

        <MinimizedChat
          username="candyvd"
          isConnected={true}
          onToggleChat={toggleChat}
        />
      </div>
    </div>
  );
};

export default DiscordSidebar;
