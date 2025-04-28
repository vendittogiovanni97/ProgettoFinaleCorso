import React, { useState, FormEvent } from "react";
import * as S from "../../../styled/ChatAreaStyled";
import AttachmentMenuWrapper from "./AttachmentMenuWrapper";
import EmojiPickerWrapper from "./EmojiPickerWrapper";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleFileSelect = (
    file: File,
    type: "image" | "document" | "video"
  ) => {
    console.log(`${type} selected:`, file.name);
    // Qui potresti voler implementare la logica per inviare file
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  return (
    <S.MessageInputContainerStyled onSubmit={handleSendMessage}>
      <AttachmentMenuWrapper onFileSelect={handleFileSelect} />
      <S.MessageInputStyled
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <EmojiPickerWrapper onEmojiSelect={handleEmojiSelect} />
      <S.SendButtonStyled type="submit" disabled={!newMessage.trim()}>
        📤
      </S.SendButtonStyled>
    </S.MessageInputContainerStyled>
  );
};

export default MessageInput;
