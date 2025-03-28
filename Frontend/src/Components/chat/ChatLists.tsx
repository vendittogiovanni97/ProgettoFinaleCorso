import React, { useState } from "react";
import { ChatListsProps } from "../../types/components/typesChatLists";
import * as S from "../../styled/ChatListStyled";

const ChatLists: React.FC<ChatListsProps> = ({
  contacts,
  groups,
  onSelectChat,
  activeChatId,
}) => {
  const [activeTab, setActiveTab] = useState<"groups" | "people">("people");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <S.ChatListsContainer>
      <S.SearchContainer>
        <S.SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </S.SearchContainer>

      <S.TabsContainer>
        <S.Tab
          active={activeTab === "groups"}
          onClick={() => handleTabClick("groups")}
        >
          Groups
        </S.Tab>
        <S.Tab
          active={activeTab === "people"}
          onClick={() => handleTabClick("people")}
        >
          People
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
                {Math.random() > 0.5 && <S.UnreadBadge>1</S.UnreadBadge>}
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
                {Math.random() > 0.5 && <S.UnreadBadge>2</S.UnreadBadge>}
              </S.ChatMeta>
            </S.ChatItem>
          ))}
      </S.ChatList>
    </S.ChatListsContainer>
  );
};

export default ChatLists;