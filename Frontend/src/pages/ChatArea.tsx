import React, { useState, useRef, useEffect, FormEvent } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import * as S from "../styled/ChatAreaStyled";
import * as AttachmentStyles from "../styled/AttachmentMenuStyled";
import { Message, Contact } from "../types/components/typesDashboard";
import { ChatAreaProps } from "../types/components/typesChatArea";
import AttachmentMenu from "../Components/chat/AttachmentMenu";
import VideoCall from "../Components/chat/VideoCall";
import ContactInfoPanel from "../Components/ChatArea/components/ContactMediaPanel";
import useOutsideClick from "../hook/useOutsideClick";

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
  const [newMessage, setNewMessage] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const attachmentRef = useOutsideClick(() => setShowAttachmentMenu(false));

  // Effects
  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setLocalMessages(updatedMessages);
    setMessages(updatedMessages);
    setNewMessage("");
  };

  const handleFileSelect = (
    file: File,
    type: "image" | "document" | "video"
  ) => {
    console.log(`${type} selected:`, file.name);
    setShowAttachmentMenu(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
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
      <S.ChatHeaderStyled>
        <S.UserInfoStyled>
          <S.AvatarStyled>{currentChatName.charAt(0)}</S.AvatarStyled>
          <div>
            <S.LinkStyled to={`/profile/${currentChatId}`}>
              {currentChatName}
            </S.LinkStyled>
            <small>{isOnline ? "Online" : lastSeen}</small>
          </div>
        </S.UserInfoStyled>

        <S.HeaderActionsStyled>
          <S.IconButtonStyled
            onClick={() => setIsVideoCallOpen(!isVideoCallOpen)}
          >
            {isVideoCallOpen ? "💬" : "📹"}
          </S.IconButtonStyled>
          <S.IconButtonStyled
            onClick={() => setShowContactInfo(!showContactInfo)}
          >
            ⋮
          </S.IconButtonStyled>
        </S.HeaderActionsStyled>
      </S.ChatHeaderStyled>

      {/* Main Content */}
      {isVideoCallOpen ? (
        <VideoCall onClose={() => setIsVideoCallOpen(false)} />
      ) : (
        <S.ChatContainerStyled>
          {/* Messages */}
          <S.MessageContainerStyled>
            {messages.map((message) => (
              <div key={message.id}>
                <S.MessageBubbleStyled isUser={message.sender === "user"}>
                  <p>{message.text}</p>
                </S.MessageBubbleStyled>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </S.MessageContainerStyled>

          {/* Input Area */}
          <S.MessageInputContainerStyled onSubmit={handleSendMessage}>
            <AttachmentStyles.AttachmentWrapper ref={attachmentRef}>
              <S.IconButtonStyled
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              >
                📎
              </S.IconButtonStyled>
              <AttachmentMenu
                isOpen={showAttachmentMenu}
                onClose={() => setShowAttachmentMenu(false)}
                onFileSelect={handleFileSelect}
              />
            </AttachmentStyles.AttachmentWrapper>

            <S.MessageInputStyled
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />

            <S.IconButtonStyled
              type="button"
              onClick={() => setIsPickerVisible(!isPickerVisible)}
            >
              {isPickerVisible ? "❌" : "😊"}
            </S.IconButtonStyled>

            {isPickerVisible && (
              <S.EmojiPickerContainerStyled>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </S.EmojiPickerContainerStyled>
            )}

            <S.SendButtonStyled type="submit" disabled={!newMessage.trim()}>
              📤
            </S.SendButtonStyled>
          </S.MessageInputContainerStyled>
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
