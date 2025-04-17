// ServerIcon.tsx
import React from "react";
import { ServerIconProps } from "../../../types/components/typesDiscordSidebar";
import * as S from "../../../styled/DiscordSidebarStyled";

const ServerIcon: React.FC<ServerIconProps> = ({
  server,
  isActive,
  onClick,
}) => {
  return (
    <S.DiscordServerIcon $active={isActive} onClick={onClick}>
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

export default ServerIcon;
