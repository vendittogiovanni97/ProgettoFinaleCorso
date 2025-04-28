import React, { useState } from "react";
import { ChatListsProps } from "../../types/components/typesChatLists";
import { useChatListColors, createStyledComponents } from "../../styled/ChatListStyled";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";

const ChatLists: React.FC<ChatListsProps> = ({
  contacts,
  groups,
  onSelectChat,
  activeChatId,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"groups" | "people">("people");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); 
  const colors = useChatListColors();
  const S = createStyledComponents(colors);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabClick = (tab: "groups" | "people") => {
    setActiveTab(tab);
  };

  const handleChatClick = (id: number, isGroup: boolean, name: string) => {
    onSelectChat(id, isGroup, name);
  };
  const handleSearch = () => {
    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) {
      navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
      setSearchQuery("");
    }
  };

  return (
    <S.ChatListsContainer >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <S.TabsContainer>
        <S.Tab
          active={activeTab === "groups"}
          onClick={() => handleTabClick("groups")}
        >
          {t("chatList.groups")}
        </S.Tab>
        <S.Tab
          active={activeTab === "people"}
          onClick={() => handleTabClick("people")}
        >
          {t("chatList.people")}
        </S.Tab>
      </S.TabsContainer>

      <S.ChatList>
        {activeTab === "people" &&
          filteredContacts.map((contact) => (
            <S.ChatItem
              key={contact.id}
              active={activeChatId === contact.id}
              onClick={() => handleChatClick(contact.id, false, contact.name)}
            >
              <S.ChatAvatar>{contact.name.charAt(0)}</S.ChatAvatar>
              <S.ChatDetails>
                <S.ChatName>
                  {contact.name}
                  {contact.isOnline && <S.StatusIndicator />}
                </S.ChatName>
                <S.ChatPreview>{contact.status}</S.ChatPreview>
              </S.ChatDetails>
              <S.ChatMeta>
                <S.ChatTime>{contact.lastSeen}</S.ChatTime>
                {contact.unreadCount && contact.unreadCount > 0 && <S.UnreadBadge>{contact.unreadCount}</S.UnreadBadge>}
              </S.ChatMeta>
            </S.ChatItem>
          ))}

        {activeTab === "groups" &&
          filteredGroups.map((group) => (
            <S.ChatItem
              key={group.id}
              active={activeChatId === group.id}
              onClick={() => handleChatClick(group.id, true, group.name)}
            >
              <S.ChatAvatar>{group.name.charAt(0)}</S.ChatAvatar>
              <S.ChatDetails>
                <S.ChatName>{group.name}</S.ChatName>
                <S.ChatPreview>{group.description}</S.ChatPreview>
              </S.ChatDetails>
              <S.ChatMeta>
                <S.ChatTime>{group.lastActive}</S.ChatTime>
                {group.unreadCount && group.unreadCount > 0 && <S.UnreadBadge>{group.unreadCount ?? 0}</S.UnreadBadge>}
              </S.ChatMeta>
            </S.ChatItem>
          ))}
      </S.ChatList>
    </S.ChatListsContainer>
  );
};

export default ChatLists;