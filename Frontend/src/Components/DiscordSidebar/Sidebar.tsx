// DiscordSidebar.tsx
import React, { useEffect, useState } from "react";
import {
  DiscordSidebarProps,
  Server,
} from "../../types/components/typesDiscordSidebar";
import * as S from "../../styled/DiscordSidebarStyled";
import backendFetch from "../../services/api";
import { ChannelList, ServerIcon } from ".";

const DiscordSidebar: React.FC<DiscordSidebarProps> = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [activeServer, setActiveServer] = useState<string>("");

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const { responseBody } = await backendFetch("/servers/server");
        setServers(responseBody.details);
        console.log("Server ricevuti", responseBody);
        if (responseBody.details.length > 0) {
          setActiveServer(responseBody.details[0].id);
        }
      } catch (error) {
        console.error("Errore nel recupero dei server:", error);
      }
    };

    fetchServer();
  }, []);

  const handleServerSelect = (serverId: string) => {
    setActiveServer(serverId);
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
        {activeServer && <ChannelList serverId={activeServer} />}
      </S.DiscordChannelSidebar>
    </S.DiscordSidebarContainer>
  );
};

export default DiscordSidebar;
