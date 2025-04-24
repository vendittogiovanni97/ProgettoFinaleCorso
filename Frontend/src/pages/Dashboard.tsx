import { useState } from "react";
import "../customizations/Theme";
import {
  AppWrapper,
  MainContent,
  ChatLayout,
  ChatListPanel,
} from "../styled/DashboardStyled";
import ChatLists from "../Components/chat/ChatLists";
import Navbar from "../Components/Navbar/Navbar";
import { Message, Contact, Group } from "../types/components/typesDashboard";
import { DiscordSidebar } from "../Components/DiscordSidebar";
import ChatArea from "../Components/ChatArea/ChatArea";

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey There!",
      sender: "other",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    },
    {
      id: 2,
      text: "How are you?",
      sender: "other",
      timestamp: new Date(
        new Date().setHours(
          new Date().getHours() - 1,
          new Date().getMinutes() - 30
        )
      ),
    },
    {
      id: 3,
      text: "Hello!",
      sender: "user",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    },
    {
      id: 4,
      text: "I am fine and how are you?",
      sender: "user",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 20)),
    },
    {
      id: 5,
      text: "I am doing well, Can we meet tomorrow?",
      sender: "other",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
    },
    {
      id: 6,
      text: "Yes Sure!",
      sender: "user",
      timestamp: new Date(),
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Anil",
      status: "April fool's day",
      lastSeen: "2:02pm",
      isOnline: true,
      avatar: "/avatars/anil.jpg",
      phone: "+39 392 123 4567",
    },
    {
      id: 2,
      name: "Chutthiya",
      status: "Busy",
      lastSeen: "12:15pm",
      isOnline: false,
      avatar: "/avatars/chutthiya.jpg",
      phone: "+39 392 234 5678",
    },
    {
      id: 3,
      name: "Mary ma'am",
      status: "You have to report it...",
      lastSeen: "2:40pm",
      isOnline: false,
      avatar: "/avatars/mary.jpg",
      phone: "+39 392 345 6789",
    },
    {
      id: 4,
      name: "Bill Gates",
      status: "Nevermind bro",
      lastSeen: "12:31pm",
      isOnline: false,
      avatar: "/avatars/bill.jpg",
      phone: "+39 392 456 7890",
    },
    {
      id: 5,
      name: "Victoria H",
      status: "Okay, brother, let's see...",
      lastSeen: "11:12am",
      isOnline: true,
      avatar: "/avatars/victoria.jpg",
      phone: "+39 392 567 8901",
    },
  ]);

  const [groups] = useState<Group[]>([
    {
      id: 101,
      name: "Friends Forever",
      description: "hahahaha!!!",
      lastActive: "9:50pm",
      avatar: "/avatars/group1.jpg",
    },
    {
      id: 102,
      name: "Mera Gang",
      description: "Kynungg???",
      lastActive: "12:31pm",
      avatar: "/avatars/group2.jpg",
    },
    {
      id: 103,
      name: "Hiking",
      description: "It's not going to happen",
      lastActive: "11:12am",
      avatar: "/avatars/group3.jpg",
    },
  ]);

  const [currentChatName, setCurrentChatName] = useState<string>("Anil");
  const [currentChatId, setCurrentChatId] = useState<number>(1);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [lastSeen, setLastSeen] = useState<string>("Online");
  const [showChatList, setShowChatList] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // State for storing messages for each voice channel
  const [channelMessages, setChannelMessages] = useState<
    Record<string, Message[]>
  >({
    channel1: [], // Messages for "Lobby" channel
    channel2: [], // Messages for "PrimaStanza" channel
  });

  const handleSelectChat = (
    id: number,
    isGroup: boolean,
    name: string
  ): void => {
    console.log(`Chat selected: ${id}, isGroup: ${isGroup}, name: ${name}`);
    setCurrentChatId(id);
    setCurrentChatName(name);

    if (isGroup) {
      setIsOnline(false);
      const group = groups.find((g) => g.id === id);
      if (group) {
        setLastSeen(`Last active: ${group.lastActive}`);
      }
    } else {
      const contact = contacts.find((c) => c.id === id);
      if (contact) {
        setIsOnline(contact.isOnline);
        setLastSeen(
          contact.isOnline ? "Online" : `Last seen: ${contact.lastSeen}`
        );
      }
    }

    // On mobile, close chat list after selection
    if (window.innerWidth <= 768) {
      setShowChatList(false);
    }
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDiscordChannelSelect = (
    channelId: string,
    channelName: string
  ): void => {
    setCurrentChatId(Number(channelId));
    setCurrentChatName(channelName);
    setIsOnline(true); // Voice channels are always "online"
    setLastSeen("Online");
    setMessages(channelMessages[channelId] || []);
  };

  // Function to toggle chat list on mobile
  const toggleChatList = (): void => {
    setShowChatList(!showChatList);
  };

  return (
    <AppWrapper>
      <Navbar onMenuClick={toggleSidebar} />

      <MainContent>
        {isSidebarOpen && (
          <DiscordSidebar onChannelSelect={handleDiscordChannelSelect} />
        )}

        <ChatLayout>
          {showChatList && (
            <ChatListPanel>
              <ChatLists
                contacts={contacts}
                groups={groups}
                onSelectChat={handleSelectChat}
                activeChatId={currentChatId}
              />
            </ChatListPanel>
          )}
          <ChatArea
            currentChatId={currentChatId}
            currentChatName={currentChatName}
            isOnline={isOnline}
            lastSeen={lastSeen}
            initialMessages={messages}
            setMessages={setMessages}
            contacts={contacts}
            channelMessages={channelMessages}
            setChannelMessages={setChannelMessages}
          />
          {!showChatList && (
            <button
              className="mobile-toggle-button"
              onClick={toggleChatList}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 100,
                display: window.innerWidth <= 768 ? "block" : "none",
              }}
            >
              💬
            </button>
          )}
        </ChatLayout>
      </MainContent>
    </AppWrapper>
  );
};

export default Dashboard;
