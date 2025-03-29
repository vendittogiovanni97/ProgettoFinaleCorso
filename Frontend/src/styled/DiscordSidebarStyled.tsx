// DiscordSidebar.styles.ts
import styled from 'styled-components';

export const DiscordSidebarContainer = styled.div`
  display: flex;
  height: 100%;
  color: var(--text-light);
  width: 250px;
  z-index: 1;
`;

export const DiscordServerList = styled.div`
  width: 72px;
  background-color: var(--background-dark);
  height: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
`;

export const DiscordServerIcon = styled.div<{ $active?: boolean; $addServer?: boolean; $explore?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => 
    props.$active ? 'var(--primary-color)' : 
    props.$addServer || props.$explore ? 'var(--background-light)' : 'var(--background-light)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;
  transition: border-radius 0.15s ease-out;
  font-weight: bold;
  font-size: ${props => props.$addServer ? '24px' : props.$explore ? '18px' : '18px'};
  color: ${props => 
    props.$active ? 'var(--text-dark)' : 
    props.$addServer ? 'var(--primary-color)' : 'var(--text-light)'};

  border-radius: ${props => props.$active ? '16px' : '50%'};

  &::before {
    content: "";
    position: absolute;
    left: -16px;
    width: 8px;
    border-radius: 0 4px 4px 0;
    height: 0;
    background-color: var(--primary-color);
    transition: height 0.15s ease-out;
  }

  &:hover::before {
    height: 20px;
  }

  ${props => props.$active && '&::before { height: 40px; }'}
`;

export const DiscordServerIconImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const DiscordUnreadBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: var(--primary-color);
  color: var(--text-dark);
  border-radius: 10px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--background-dark);
`;

export const DiscordServerInitial = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text-light);
`;

export const DiscordChannelSidebar = styled.div`
  width: 178px;
  background-color: var(--background-light);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
`;

export const DiscordServerHeader = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);

  h3 {
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--primary-color);
  }
`;

export const ServerDropdown = styled.span`
  color: var(--text-light);
  cursor: pointer;
`;

export const DiscordCategories = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
`;

export const DiscordCategory = styled.div`
  margin-top: 16px;
`;

export const DiscordCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  color: var(--primary-color);
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  padding: 0 8px;
  margin-bottom: 4px;
  cursor: pointer;
`;

export const DiscordCategoryArrow = styled.span`
  margin-right: 4px;
  font-size: 9px;
`;

export const DiscordCategoryName = styled.span`
  letter-spacing: 0.5px;
`;

export const DiscordChannelList = styled.div`
  margin-left: 8px;
`;

export const DiscordChannel = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  color: var(--text-light);
  margin-bottom: 2px;
  cursor: pointer;
  background-color: ${props => props.$active ? 'var(--hover-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-light)'};

  &:hover {
    background-color: var(--hover-color);
  }
`;

export const DiscordChannelIcon = styled.span`
  margin-right: 6px;
  width: 20px;
  display: flex;
  justify-content: center;
`;

export const DiscordChannelName = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;