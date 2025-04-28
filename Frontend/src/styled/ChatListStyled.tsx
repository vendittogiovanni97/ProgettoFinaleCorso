import styled from "styled-components";
import { useThemeContext } from "../context/ThemeContextDefinition";

export const useChatListColors = () => {
  const { mode } = useThemeContext();
  
  return {
    backgroundColor: mode === 'dark' ? "#2a2a2a" : "#ffffff",
    searchBackground: mode === 'dark' ? "rgba(40, 40, 40, 0.88)" : "rgba(240, 240, 240, 0.88)",
    textColor: mode === 'dark' ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
    textColorSecondary: mode === 'dark' ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
    textColorTertiary: mode === 'dark' ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
    primary: "#ffd700",
    activeBackground: mode === 'dark' ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 215, 0, 0.15)",
    hoverBackground: mode === 'dark' ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 215, 0, 0.08)",
    avatarBackground: mode === 'dark' ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 215, 0, 0.15)",
    borderColor: mode === 'dark' ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 215, 0, 0.2)",
    boxShadow: mode === 'dark' ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0, 0, 0, 0.05)",
  };
};

// Componenti di stile che usano i colori del tema
export const createStyledComponents = (colors: ReturnType<typeof useChatListColors>) => {
  const ChatListsContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    overflow-y: auto;
    background: ${colors.backgroundColor};
    display: flex;
    flex-direction: column;
    padding: 15px 15px 5px;
    gap: 12px;
  `;

  const SearchContainer = styled.div`
    background: ${colors.searchBackground};
    margin: 0 15px 10px;
    border-radius: 12px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    box-shadow: ${colors.boxShadow};
    height: 40px;
  `;

  const SearchInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    margin-left: 8px;
    font-size: 14px;
    color: ${colors.textColor};
    background: transparent;
  `;

  const TabsContainer = styled.div`
    display: flex;
    border-bottom: 1px solid ${colors.borderColor};
    margin-bottom: 15px;
  `;

  const Tab = styled.div<{ active: boolean }>`
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;
    color: ${({ active }) => (active ? `rgba(255, 215, 0, 0.9)` : colors.textColorSecondary)};
    border-bottom: 2px solid ${({ active }) => (active ? `rgba(255, 215, 0, 0.9)` : "transparent")};
    transition: all 0.2s ease;

    &:hover {
      color: rgba(255, 215, 0, 0.8);
    }
  `;

  const ChatList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 10px;
  `;

  const ChatItem = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 8px;
    min-height: 60px;
    background: ${({ active }) => active ? colors.activeBackground : "transparent"};

    &:hover {
      background: ${colors.hoverBackground};
    }
  `;

  const ChatAvatar = styled.div`
    width: 42px;
    height: 42px;
    min-width: 42px;
    border-radius: 50%;
    background: ${colors.avatarBackground};
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 215, 0, 0.9);
    font-weight: bold;
    font-size: 18px;
  `;

  const ChatDetails = styled.div`
    flex: 1;
    min-width: 0;
  `;

  const ChatName = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
    color: ${colors.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const StatusIndicator = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 200, 0, 0.8);
  `;

  const ChatPreview = styled.div`
    color: ${colors.textColorSecondary};
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const ChatMeta = styled.div`
    text-align: right;
    color: ${colors.textColorTertiary};
    font-size: 12px;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 65px;
  `;

  const ChatTime = styled.div`
    margin-bottom: 4px;
    white-space: nowrap;
  `;

  const UnreadBadge = styled.div`
    background: rgba(255, 215, 0, 0.9);
    color: rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  `;

  return {
    ChatListsContainer,
    SearchContainer,
    SearchInput,
    TabsContainer,
    Tab,
    ChatList,
    ChatItem,
    ChatAvatar,
    ChatDetails,
    ChatName,
    StatusIndicator,
    ChatPreview,
    ChatMeta,
    ChatTime,
    UnreadBadge
  };
};

export const SearchContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 8px;
  background-color: #fff3cd;
  border-radius: 20px;
  
  &:hover {
    background-color: #ffe69c;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  
  &::placeholder {
    color: #666;
    opacity: 0.8;
  }
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #000;
  
  &:hover {
    opacity: 0.8;
  }
`;