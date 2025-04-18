// ChannelList.tsx
import React, { useEffect, useState } from "react";
import backendFetch from "../../../services/api";
import * as S from "../../../styled/DiscordSidebarStyled";
import { Channel } from "../../../types/components/typesDiscordSidebar";

interface ChannelListProps {
  serverId: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ serverId }) => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { responseBody } = await backendFetch(
          `/servers/${serverId}/channels`
        );
        setChannels(responseBody.details);
      } catch (error) {
        console.error("Errore nel recupero dei channel:", error);
      }
    };

    if (serverId) fetchChannels();
  }, [serverId]);

  return (
    <S.DiscordCategories>
      <S.DiscordCategoryHeader>
        <S.DiscordCategoryArrow>▾</S.DiscordCategoryArrow>
        <S.DiscordCategoryName>Canali</S.DiscordCategoryName>
      </S.DiscordCategoryHeader>
      <S.DiscordChannelList>
        {channels.map((channel) => (
          <S.DiscordChannel key={channel.id}>
            <S.DiscordChannelIcon></S.DiscordChannelIcon>
            <S.DiscordChannelName>{channel.name}</S.DiscordChannelName>
          </S.DiscordChannel>
        ))}
      </S.DiscordChannelList>
    </S.DiscordCategories>
  );
};

export default ChannelList;
