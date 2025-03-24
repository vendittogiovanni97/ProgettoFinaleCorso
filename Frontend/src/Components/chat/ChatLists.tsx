import React, { useState } from "react";
import { ChatListsProps } from "../../types/components/typesChatLists";

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
    console.log(`Tab clicked: ${tab}`);
    setActiveTab(tab);
  };

  const handleChatClick = (id: number, isGroup: boolean, name: string) => {
    console.log(`Chat clicked: ${id}, isGroup: ${isGroup}, name: ${name}`);
    onSelectChat(id, isGroup, name);
  };

  return (
    <div className="chat-lists">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "groups" ? "active" : ""}`}
          onClick={() => handleTabClick("groups")}
        >
          Groups
        </div>
        <div
          className={`tab ${activeTab === "people" ? "active" : ""}`}
          onClick={() => handleTabClick("people")}
        >
          People
        </div>
      </div>

      <div className="chat-list">
        {activeTab === "people" &&
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`chat-item ${activeChatId === contact.id ? "active" : ""}`}
              onClick={() => handleChatClick(contact.id, false, contact.name)}
            >
              <div className="chat-avatar">{contact.name.charAt(0)}</div>
              <div className="chat-details">
                <div className="chat-name">
                  {contact.name}
                  {contact.isOnline && (
                    <span className="status-indicator"></span>
                  )}
                </div>
                <div className="chat-preview">{contact.status}</div>
              </div>
              <div className="chat-meta">
                <div className="chat-time">{contact.lastSeen}</div>
                {Math.random() > 0.5 && <div className="unread-badge">1</div>}
              </div>
            </div>
          ))}

        {activeTab === "groups" &&
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className={`chat-item ${activeChatId === group.id ? "active" : ""}`}
              onClick={() => handleChatClick(group.id, true, group.name)}
            >
              <div className="chat-avatar">{group.name.charAt(0)}</div>
              <div className="chat-details">
                <div className="chat-name">{group.name}</div>
                <div className="chat-preview">{group.description}</div>
              </div>
              <div className="chat-meta">
                <div className="chat-time">{group.lastActive}</div>
                {Math.random() > 0.5 && <div className="unread-badge">2</div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatLists;
