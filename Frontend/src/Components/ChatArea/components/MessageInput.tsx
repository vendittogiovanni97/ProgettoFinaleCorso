import React, { useState } from "react";
import { MessageInputProps } from "../../../types/components/typesChatArea";
import channelMessageService from "../../../services/components/channelMessageService";
import directMessageService from "../../../services/components/directMessageService";
import * as S from "../../../styled/ChatAreaStyled";
import AttachmentMenuWrapper from "./AttachmentMenuWrapper";
import EmojiPickerWrapper from "./EmojiPickerWrapper";

const MessageInput: React.FC<MessageInputProps> = ({
  channelId,
  isDirectMessage,
  receiverId,
}) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);

      if (isDirectMessage && receiverId) {
        await directMessageService.sendMessage(receiverId, message);
      } else if (channelId) {
        await channelMessageService.sendMessage(channelId, message);
      }

      setMessage("");
    } catch (error) {
      console.error("Errore nell'invio del messaggio:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileSelect = (
    file: File,
    type: "image" | "document" | "video"
  ) => {
    console.log(`${type} selected:, file.name`);
    // Qui potresti voler implementare la logica per inviare file
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  return (
    <S.MessageInputContainerStyled onSubmit={handleSendMessage}>
      <AttachmentMenuWrapper onFileSelect={handleFileSelect} />
      <S.MessageInputStyled
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <EmojiPickerWrapper onEmojiSelect={handleEmojiSelect} />
      <S.SendButtonStyled type="submit" disabled={!message.trim()}>
        📤
      </S.SendButtonStyled>
    </S.MessageInputContainerStyled>
  );
};

export default MessageInput;
