import React, { useEffect, useState } from "react";
import * as S from "../../../styled/DiscordSidebarStyled";
import {
  Channel,
  ChannelListProps,
} from "../../../types/components/typesDiscordSidebar";
import serverService from "../../../services/components/serverService";

const ChannelList: React.FC<ChannelListProps> = ({
  serverId,
  onChannelSelect,
}) => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const channelsData = await serverService.getChannels(serverId);
        setChannels(
          channelsData.map((channel) => ({
            ...channel,
            id: channel.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Errore nel recupero dei canali:", error);
      }
    };

    if (serverId) {
      fetchChannels();
    }
  }, [serverId]);

  const handleChannelClick = (channelId: string, channelName: string) => {
    if (onChannelSelect) {
      onChannelSelect(channelId, channelName);
    }
  };

  return (
    <S.DiscordCategories>
      <S.DiscordCategoryHeader>
        <S.DiscordCategoryArrow>▾</S.DiscordCategoryArrow>
        <S.DiscordCategoryName>Canali</S.DiscordCategoryName>
      </S.DiscordCategoryHeader>
      <S.DiscordChannelList>
        {channels.map((channel) => (
          <S.DiscordChannel
            key={channel.id}
            onClick={() =>
              handleChannelClick(channel.id.toString(), channel.name)
            }
          >
            <S.DiscordChannelIcon>
              {channel.type === "voice" ? "🔊" : "#"}
            </S.DiscordChannelIcon>
            <S.DiscordChannelName>{channel.name}</S.DiscordChannelName>
          </S.DiscordChannel>
        ))}
      </S.DiscordChannelList>
    </S.DiscordCategories>
  );
};

export default ChannelList;
