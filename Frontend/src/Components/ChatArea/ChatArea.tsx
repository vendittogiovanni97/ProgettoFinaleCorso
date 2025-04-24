import React, { useState, useRef, useEffect } from "react";
import * as S from "../../styled/ChatAreaStyled";
import { ChatAreaProps } from "../../types/components/typesChatArea";
import { Contact } from "../../types/components/typesChatLists";
import { Message } from "../../types/components/typesDashboard";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";
import VideoCall from "../chat/VideoCall";
import ContactInfoPanel from "./components/ContactMediaPanel";

const ChatArea: React.FC<ChatAreaProps> = ({
  currentChatId,
  currentChatName,
  isOnline,
  lastSeen,
  initialMessages,
  setMessages,
  contacts,
}) => {
  // State
  const [messages, setLocalMessages] = useState<Message[]>(initialMessages);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setLocalMessages(updatedMessages);
    setMessages(updatedMessages);
  };

  const getCurrentContact = (): Contact => {
    return (
      contacts.find((c) => c.id === currentChatId) || {
        id: 0,
        name: "Unknown",
        status: "",
        avatar: "",
        lastSeen: "",
        isOnline: false,
        phone: "",
      }
    );
  };

  return (
    <S.ChatAreaStyled>
      {/* Header */}
      <ChatHeader
        currentChatName={currentChatName}
        currentChatId={currentChatId}
        isOnline={isOnline}
        lastSeen={lastSeen}
        onVideoCallToggle={() => setIsVideoCallOpen(!isVideoCallOpen)}
        onContactInfoToggle={() => setShowContactInfo(!showContactInfo)}
      />

      {/* Main Content */}
      {isVideoCallOpen ? (
        <VideoCall onClose={() => setIsVideoCallOpen(false)} />
      ) : (
        <S.ChatContainerStyled>
          {/* Messages */}
          <MessageList messages={messages} />

          {/* Input Area */}
          <MessageInput onSendMessage={handleSendMessage} />
        </S.ChatContainerStyled>
      )}

      {/* Contact Info */}
      {showContactInfo && (
        <ContactInfoPanel
          contact={getCurrentContact()}
          onClose={() => setShowContactInfo(false)}
          sharedMedia={[
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
          ]}
        />
      )}
    </S.ChatAreaStyled>
  );
};

export default ChatArea;
