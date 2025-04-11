import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState, useRef, useEffect, FormEvent } from "react";
import ContactInfoPanel from "../Components/ContactMediaPanel";
import {
  Message,
  Contact,
  SharedMedia,
} from "../types/components/typesDashboard";
import VideoCall from "../Components/chat/VideoCall";
import {
  MessageBubbleComponentProps,
  ChatAreaProps,
} from "../types/components/typesChatArea";
import {
  ChatAreaStyled,
  ChatHeaderStyled,
  UserInfoStyled,
  AvatarStyled,
  LinkStyled,
  HeaderActionsStyled,
  IconButtonStyled,
  ChatContainerStyled,
  MessageContainerStyled,
  MessageBubbleStyled,
  MessageTimeStyled,
  MessageInputContainerStyled,
  MessageInputStyled,
  EmojiPickerContainerStyled,
  SendButtonStyled,
} from "../styled/ChatAreaStyled";

const ChatArea: React.FC<ChatAreaProps> = ({
  currentChatId,
  currentChatName,
  isOnline,
  lastSeen,
  initialMessages,
  setMessages: setParentMessages,
  contacts,
  channelMessages,
  setChannelMessages,
}) => {
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState<boolean>(false);
  const [messages, setLocalMessages] = useState<Message[]>(initialMessages);

  // Sync with parent messages when props change
  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

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

  const getRandomResponse = (): string => {
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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleContactInfo = (): void => {
    setShowContactInfo(!showContactInfo);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent): void => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setLocalMessages(updatedMessages);
    setParentMessages(updatedMessages);

    setChannelMessages((prev) => ({
      ...prev,
      [currentChatId.toString()]: updatedMessages,
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
      setLocalMessages(updatedMessagesWithResponse);
      setParentMessages(updatedMessagesWithResponse);

      setChannelMessages((prev) => ({
        ...prev,
        [currentChatId.toString()]: updatedMessagesWithResponse,
      }));
    }, 1000);
  };

  const togglePicker = (): void => {
    setIsPickerVisible(!isPickerVisible);
  };

  const MessageBubbleComponent: React.FC<MessageBubbleComponentProps> = ({
    isUser,
    text,
    timestamp,
  }) => {
    return (
      <div>
        <p>{text}</p>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
    );
  };

  const handleEmojiClick = (emojiData: EmojiClickData): void => {
    setNewMessage((prevText) => prevText + emojiData.emoji);
  };

  const getCurrentContact = (): Contact => {
    return (
      contacts.find((contact) => contact.id === currentChatId) || contacts[0]
    );
  };

  return (
    <ChatAreaStyled>
      <ChatHeaderStyled>
        <UserInfoStyled>
          <AvatarStyled>{currentChatName.charAt(0)}</AvatarStyled>
          <div>
            <LinkStyled
              to={`/profile/user/${currentChatId}`}
              className="user-name"
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentChatName}
            </LinkStyled>
            <p style={{ fontSize: "12px", opacity: 0.8, margin: 0 }}>
              {isOnline ? "Online" : lastSeen}
            </p>
          </div>
        </UserInfoStyled>
        <HeaderActionsStyled>
          <IconButtonStyled
            onClick={() => setIsVideoCallOpen(!isVideoCallOpen)}
          >
            {isVideoCallOpen ? "💬" : "📹"}
          </IconButtonStyled>
          <IconButtonStyled onClick={toggleContactInfo}>⋮</IconButtonStyled>
        </HeaderActionsStyled>
      </ChatHeaderStyled>

      {isVideoCallOpen ? (
        <VideoCall onClose={() => setIsVideoCallOpen(false)} />
      ) : (
        <ChatContainerStyled>
          <MessageContainerStyled>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "user-message" : "other-message"
                }`}
                style={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <MessageBubbleStyled isUser={message.sender === "user"}>
                  <MessageBubbleComponent
                    isUser={message.sender === "user"}
                    text={message.text}
                    timestamp={message.timestamp}
                  />
                </MessageBubbleStyled>
                <MessageTimeStyled isUser={message.sender === "user"}>
                  {formatTime(message.timestamp)}
                </MessageTimeStyled>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </MessageContainerStyled>

          <MessageInputContainerStyled onSubmit={handleSendMessage}>
            <IconButtonStyled onClick={() => console.log("Attachment clicked")}>
              📎
            </IconButtonStyled>
            <MessageInputStyled
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <IconButtonStyled type="button" onClick={togglePicker}>
              {isPickerVisible ? "❌" : "😊"}
            </IconButtonStyled>
            {isPickerVisible && (
              <EmojiPickerContainerStyled>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </EmojiPickerContainerStyled>
            )}
            <SendButtonStyled type="submit" disabled={newMessage.trim() === ""}>
              <span role="img" aria-label="send">
                📤
              </span>
            </SendButtonStyled>
          </MessageInputContainerStyled>
        </ChatContainerStyled>
      )}

      {showContactInfo && (
        <ContactInfoPanel
          contact={getCurrentContact()}
          onClose={toggleContactInfo}
          sharedMedia={sharedMedia}
        />
      )}
    </ChatAreaStyled>
  );
};

export default ChatArea;
