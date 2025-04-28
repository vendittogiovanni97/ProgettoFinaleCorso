import React from "react";
import * as S from "../../../styled/ChatAreaStyled";

interface ChatHeaderProps {
  currentChatName: string;
  currentChatId: number;
  isOnline: boolean;
  lastSeen: string;
  onVideoCallToggle: () => void;
  onContactInfoToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentChatName,
  currentChatId,
  isOnline,
  lastSeen,
  onVideoCallToggle,
  onContactInfoToggle,
}) => {
  return (
    <S.ChatHeaderStyled>
      <S.UserInfoStyled>
        <S.AvatarStyled>{currentChatName.charAt(0)}</S.AvatarStyled>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <S.LinkStyled 
            to={`/profile/${currentChatId}`}
            style={{ 
              textDecoration: 'none',
            }}
          >
            {currentChatName}
          </S.LinkStyled>
          <small style={{ 
            fontSize: '12px', 
            color: 'var(--text-light)',
            opacity: '0.8' 
          }}>
            {isOnline ? "Online" : lastSeen}
          </small>
        </div>
      </S.UserInfoStyled>

      <S.HeaderActionsStyled>
        <S.IconButtonStyled onClick={onVideoCallToggle}>📹</S.IconButtonStyled>
        <S.IconButtonStyled onClick={onContactInfoToggle}>⋮</S.IconButtonStyled>
      </S.HeaderActionsStyled>
    </S.ChatHeaderStyled>
  );
};

export default ChatHeader;
