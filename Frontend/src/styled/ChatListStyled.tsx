import styled from "styled-components";

export const ChatListsContainer = styled.div`
   width: 100%;
  height: calc(100vh - 120px); /* Altezza fissa per permettere scrolling */
  overflow-y: auto; /* Abilita scroll verticale */
  background: #2a2a2a
  display: flex;
  flex-direction: column;
  padding: 15px 15px 5px; /* Padding ridotto in basso */
  gap: 12px; /* Gap ridotto */
`;

export const SearchContainer = styled.div`
  background: rgba(40, 40, 40, 0.88);
  margin: 0 15px 10px; /* Margini ridotti */
  border-radius: 12px; /* Bordi più stretti */
  padding: 8px 12px; /* Padding ridotto */
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 40px; /* Altezza fissa */
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  margin-bottom: 15px;
`;

export const Tab = styled.div<{ active: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ active }) => (active ? "rgba(255, 215, 0, 0.9)" : "rgba(255, 255, 255, 0.6)")};
  border-bottom: 2px solid ${({ active }) => (active ? "rgba(255, 215, 0, 0.9)" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 215, 0, 0.8);
  }
`;

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Gap ridotto tra gli item */
  padding-bottom: 10px; /* Spazio per lo scroll */
`;

export const ChatItem = styled.div<{ active: boolean }>`
   display: flex;
  align-items: center;
  padding: 10px; /* Padding ridotto */
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 8px;
  min-height: 60px; /* Altezza minima ridotta */
  background: ${({ active }) => active ? "rgba(255, 215, 0, 0.2)" : "transparent"};

  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }
`;

export const ChatAvatar = styled.div`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.2);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 215, 0, 0.9);
  font-weight: bold;
  font-size: 18px;
`;

export const ChatDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 200, 0, 0.8);
`;

export const ChatPreview = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatMeta = styled.div`
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 65px;
`;

export const ChatTime = styled.div`
  margin-bottom: 4px;
  white-space: nowrap;
`;

export const UnreadBadge = styled.div`
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