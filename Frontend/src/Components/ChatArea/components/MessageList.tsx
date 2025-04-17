// MessageList.tsx
import React from "react";
import * as S from "../../../styled/ChatAreaStyled";
import { Message } from "../../../types/components/typesDashboard";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef,
}) => {
  return (
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
  );
};

export default MessageList;
