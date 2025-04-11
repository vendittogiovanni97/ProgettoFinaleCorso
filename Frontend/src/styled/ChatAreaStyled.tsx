import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChatAreaStyled = styled.div`
  flex: 1;
  height: 100%;
  background-color: var(--background-dark);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  position: relative;
`;

export const ChatHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: var(--background-light);
  color: var(--text-light);
  border-bottom: 1px solid var(--border-color);
  width: 100%;
`;

export const UserInfoStyled = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  text-decoration-line: none;
  color: var(--text-light);
`;

export const AvatarStyled = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text-dark);
  margin-right: 10px;
`;

export const LinkStyled = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  text-decoration-line: none;
  color: var(--text-light);
`;

export const HeaderActionsStyled = styled.div`
  display: flex;
  gap: 10px;
`;

export const IconButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-light);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &: hover {
    background-color: var(--hover-color);
  }
`;

export const ChatContainerStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--background-light);
  margin: 0;
  padding: 0;
  max-width: none;
  width: 100%;
`;

export const MessageContainerStyled = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: var(--background-dark);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export interface MessageBubbleProps {
  isUser: boolean;
}

export const MessageBubbleStyled = styled.div<MessageBubbleProps>`
  max-width: 65%;
  padding: 8px 12px;
  position: relative;
  word-wrap: break-word;
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.3;
  /* Applicare stili condizionali in base al tipo di messaggio */
  ${(props) =>
    props.isUser
      ? `
    background-color: var(--primary-color);
    color: var(--text-dark);
    align-self: flex-end;
    border-top-right-radius: 4px;
    margin-left: auto;
    border-radius: 18px 4px 18px 18px;
  `
      : `
    background-color: var(--background-light);
    color: var(--text-light);
    align-self: flex-start;
    border-radius: 4px 18px 18px 18px;
  `}
`;

export const MessageInputContainerStyled = styled.form`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: var(--background-light);
  border-top: 1px solid var(--border-color);
  position: relative;
`;
export const MessageInputStyled = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  margin: 0 10px;
  outline: none;
  background-color: var(--background-dark);
  color: var(--text-light);

  &: focus {
    border-color: var(--primary-color);
  }
`;

export const EmojiPickerContainerStyled = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
  z-index: 100;
`;

export const SendButtonStyled = styled.button`
  background-color: var(--primary-color);
  color: var(--text-dark);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;

  &: disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
