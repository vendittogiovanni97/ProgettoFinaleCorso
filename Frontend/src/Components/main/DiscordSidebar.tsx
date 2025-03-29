// DiscordSidebar.tsx
import React from "react";
import { useState } from "react";
import {
  CategoryProps,
  ServerIconProps,
  DiscordSidebarProps,
  Server,
  Channel,
} from "../../types/components/typesDiscordSidebar";
import * as S from '../../styled/DiscordSidebarStyled';

const Category: React.FC<CategoryProps> = ({
  name,
  channels,
  isCollapsed,
  onToggle,
  onSelectChannel,
  activeChannelId,
}) => {
  return (
    <S.DiscordCategory>
      <S.DiscordCategoryHeader onClick={onToggle}>
        <S.DiscordCategoryArrow>
          {isCollapsed ? "▸" : "▾"}
        </S.DiscordCategoryArrow>
        <S.DiscordCategoryName>{name}</S.DiscordCategoryName>
      </S.DiscordCategoryHeader>
      {!isCollapsed && (
        <S.DiscordChannelList>
          {channels.map((channel) => (
            <S.DiscordChannel
              key={channel.id}
              $active={activeChannelId === channel.id}
              onClick={() => onSelectChannel(channel)}
            >
              <S.DiscordChannelIcon> 🔊</S.DiscordChannelIcon>
              <S.DiscordChannelName>{channel.name}</S.DiscordChannelName>
            </S.DiscordChannel>
          ))}
        </S.DiscordChannelList>
      )}
    </S.DiscordCategory>
  );
};

const ServerIcon: React.FC<ServerIconProps> = ({
  server,
  isActive,
  onClick,
}) => {
  return (
    <S.DiscordServerIcon 
      $active={isActive}
      onClick={onClick}
    >
      {server.avatar ? (
        <S.DiscordServerIconImg src={server.avatar} alt={server.name} />
      ) : (
        <S.DiscordServerInitial>{server.name.charAt(0)}</S.DiscordServerInitial>
      )}
      {server.unreadCount && (
        <S.DiscordUnreadBadge>{server.unreadCount}</S.DiscordUnreadBadge>
      )}
    </S.DiscordServerIcon>
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

  return (
    <S.DiscordSidebarContainer>
      <S.DiscordServerList>
        {servers.map((server) => (
          <ServerIcon
            key={server.id}
            server={server}
            isActive={activeServer === server.id}
            onClick={() => handleServerSelect(server.id)}
          />
        ))}
        <S.DiscordServerIcon $addServer>
          <span>+</span>
        </S.DiscordServerIcon>
        <S.DiscordServerIcon $explore>
          <span role="img" aria-label="explore">
            🔍
          </span>
        </S.DiscordServerIcon>
      </S.DiscordServerList>

      <S.DiscordChannelSidebar>
        <S.DiscordServerHeader>
          <h3>Server Progetto</h3>
          <S.ServerDropdown>▾</S.ServerDropdown>
        </S.DiscordServerHeader>

        <S.DiscordCategories>
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
        </S.DiscordCategories>
      </S.DiscordChannelSidebar>
    </S.DiscordSidebarContainer>
  );
};

export default DiscordSidebar;