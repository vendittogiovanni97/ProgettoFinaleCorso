import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--background-dark);
  overflow: hidden;
`;

export const MainContent = styled.div`
  display: flex;
  height: 93vh;
`;

export const ChatLayout = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const ChatListPanel = styled.div`
  width: 300px;
  min-width: 250px;
  max-width: 350px;
  height: 100%;
  background-color: var(--background-light);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  flex-shrink: 0;
  z-index: 2;
  transition: width 0.3s ease;
  @media (max-width: 1200px) {
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
`;
