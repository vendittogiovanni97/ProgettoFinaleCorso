import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import ContactInfoPanel from "../Components/ContactMediaPanel";
import { Message } from "../types/components/typesDashboard";
import { Contact } from "../types/components/typesDashboard";
import { Group } from "../types/components/typesDashboard";
import { SharedMedia } from "../types/components/typesDashboard";
import "../App.css";
import VideoCall from "../../src/Components/chat/VideoCall"; // Correct import for VideoCall component
import ChatLists from "../Components/chat/ChatLists";
import ResponsiveAppBar from "../Components/main/BarraSuperiore";
import DiscordSidebar from "../Components/main/DiscordSidebar";

function Dashboard() {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  // Create shared media state
  const [sharedMedia] = useState<SharedMedia[]>([
    {
      id: 1,
      type: "image",
      preview: "/media/image1.jpg",
      timestamp: new Date(),
      size: "7:38",
    },
    {
      id: 2,
      type: "document",
      preview: "/media/doc1.jpg",
      name: "Report.pdf",
      timestamp: new Date(),
      size: "0:13",
    },
    {
      id: 3,
      type: "image",
      preview: "/media/image2.jpg",
      timestamp: new Date(),
      size: "0:10",
    },
    {
      id: 4,
      type: "link",
      preview: "/media/link1.jpg",
      name: "GitHub Repository",
      timestamp: new Date(),
    },
    {
      id: 5,
      type: "image",
      preview: "/media/image3.jpg",
      timestamp: new Date(),
      size: "0:25",
    },
  ]);

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

  const [newMessage, setNewMessage] = useState("");
  const [currentChatName, setCurrentChatName] = useState("Anil");
  const [currentChatId, setCurrentChatId] = useState<number>(1);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState("Online");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Stato per memorizzare i messaggi per ogni canale vocale
  const [channelMessages, setChannelMessages] = useState<
    Record<string, Message[]>
  >({
    channel1: [], // Messaggi per il canale "Lobby"
    channel2: [], // Messaggi per il canale "PrimaStanza"
  });

  // Get the current contact based on ID
  const getCurrentContact = () => {
    return (
      contacts.find((contact) => contact.id === currentChatId) || contacts[0]
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setChannelMessages((prev) => ({
      ...prev,
      [currentChatId]: updatedMessages,
    }));
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: getRandomResponse(),
        sender: "other",
        timestamp: new Date(),
      };
      const updatedMessagesWithResponse = [...updatedMessages, responseMessage];
      setMessages(updatedMessagesWithResponse);
      setChannelMessages((prev) => ({
        ...prev,
        [currentChatId]: updatedMessagesWithResponse,
      }));
    }, 1000);
  };

  const getRandomResponse = () => {
    const responses = [
      "Ciao! Come stai?",
      "Interessante, dimmi di più.",
      "Non sono sicuro di aver capito.",
      "Suca per il ritardo nella risposta!",
      "Hai programmi per il fine settimana?",
      "Cosa ne pensi di questo tempo?",
      "Ho visto un film fantastico ieri sera!",
      "Dovremmo organizzare qualcosa insieme presto.",
      "Hai sentito le ultime notizie?",
      "Mi piacerebbe saperne di più su questo argomento.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setNewMessage((prevText) => prevText + emojiObject.emoji);
  };

  const handleSelectChat = (id: number, isGroup: boolean, name: string) => {
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleDiscordChannelSelect = (
    channelId: string,
    channelName: string
  ) => {
    setCurrentChatId(Number(channelId));
    setCurrentChatName(channelName);
    setIsOnline(true); // I canali vocali sono sempre "online"
    setLastSeen("Online");
    setMessages(channelMessages[channelId] || []);
  };

  // Funzione per aprire/chiudere la videochiamata
  const handleVideoCallClick = () => {
    setIsVideoCallOpen(!isVideoCallOpen);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <ResponsiveAppBar onMenuClick={toggleSidebar} />

        <div className="main-content">
          {isSidebarOpen && (
            <div className="sidebar">
              <DiscordSidebar onChannelSelect={handleDiscordChannelSelect} />
            </div>
          )}

          <div className="chat-layout">
            {showChatList && (
              <div className="chat-list-panel">
                <ChatLists
                  contacts={contacts}
                  groups={groups}
                  onSelectChat={handleSelectChat}
                  activeChatId={currentChatId}
                />
              </div>
            )}

            <div className="chat-area">
              <div className="chat-header">
                <div className="user-info">
                  <div className="avatar">{currentChatName.charAt(0)}</div>
                  <div className="user-details">
                    <a
                      href={`/profile/${currentChatId}`}
                      target="_blank"
                      rel="noopeener noreferrer"
                      className="user-name"
                    >
                      {currentChatName}
                    </a>
                    <p>{isOnline ? "Online" : lastSeen}</p>
                  </div>
                </div>
                <div className="header-actions">
                  <button
                    className="icon-button"
                    onClick={handleVideoCallClick}
                  >
                    📞
                  </button>
                  <button
                    className="icon-button"
                    onClick={handleVideoCallClick}
                  >
                    📹
                  </button>
                  <button
                    className="icon-button"
                    onClick={toggleContactInfo}
                  >
                    ⋮
                  </button>
                </div>
              </div>

              {isVideoCallOpen ? (
                <VideoCall onClose={handleVideoCallClick} />
              ) : (
                <div className="chat-container">
                  <div className="messages-container">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message ${message.sender === "user" ? "user-message" : "other-message"}`}
                      >
                        <div className="message-bubble">
                          <p>{message.text}</p>
                          <span className="message-time">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    className="message-input-container"
                    onSubmit={handleSendMessage}
                  >
                    <button type="button" className="icon-button">
                      📎
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="message-input"
                    />
                    <button
                      type="button"
                      className="icon-button"
                      onClick={togglePicker}
                    >
                      {isPickerVisible ? "❌" : "😊"}
                    </button>
                    {isPickerVisible && (
                      <div className="emoji-picker-container">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="send-button"
                      disabled={newMessage.trim() === ""}
                    >
                      <span role="img" aria-label="send">
                        📤
                      </span>
                    </button>
                  </form>
                </div>
              )}

              {showContactInfo && (
                <ContactInfoPanel
                  contact={getCurrentContact()}
                  onClose={toggleContactInfo}
                  sharedMedia={sharedMedia}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;