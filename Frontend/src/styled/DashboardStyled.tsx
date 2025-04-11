import styled from 'styled-components';

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
    height: calc(100vh - 64px);
    margin-top: 64px; /* Space for top bar */
    overflow: hidden;
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
    min-width: 300px;
    height: 100%;
    background-color: var(--background-light);
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
    flex-shrink: 0;
    z-index: 2;
`;
