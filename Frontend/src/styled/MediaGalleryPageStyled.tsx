import styled from 'styled-components';

export const MediaGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--background-light);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-light);
`;

export const TabsContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
`;

export const TabButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 10px;
  text-align: center;
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-light)'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--primary-color);
    display: ${props => props.active ? 'block' : 'none'};
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

export const TimeLabel = styled.div`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
  margin: 10px 0;
  padding-left: 5px;
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MediaItem = styled.div`
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
`;

export const MediaPreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MediaDuration = styled.span`
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 10px;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
`;

export const ItemIcon = styled.div`
  font-size: 24px;
  margin-right: 15px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.div`
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 5px;
`;

export const ItemDate = styled.div`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const LinkPreview = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  overflow: hidden;
  border-radius: 5px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;