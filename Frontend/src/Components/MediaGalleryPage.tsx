import React, { useState } from "react";
import { MediaGalleryPageProps } from "../types/components/typesMediaGalleryPage";
import {
  MediaGalleryContainer,
  Header,
  BackButton,
  Title,
  TabsContainer,
  TabButton,
  Content,
  TimeLabel,
  MediaGrid,
  MediaItem,
  MediaPreview,
  MediaDuration,
  ItemsList,
  ListItem,
  ItemIcon,
  ItemInfo,
  ItemName,
  ItemDate,
  LinkPreview
} from "../styled/MediaGalleryPageStyled";

const MediaGalleryPage: React.FC<MediaGalleryPageProps> = ({
  media,
  onClose,
  contactName,
}) => {
  const [activeTab, setActiveTab] = useState<"media" | "documents" | "links">("media");

  const filteredMedia = media.filter((item) => {
    if (activeTab === "media") return item.type === "image";
    if (activeTab === "documents") return item.type === "document";
    if (activeTab === "links") return item.type === "link";
    return true;
  });

  return (
    <MediaGalleryContainer>
      <Header>
        <BackButton onClick={onClose}>
          <span>←</span>
        </BackButton>
        <Title>{contactName}</Title>
      </Header>

      <TabsContainer>
        <TabButton 
          active={activeTab === "media"} 
          onClick={() => setActiveTab("media")}
        >
          Media
        </TabButton>
        <TabButton 
          active={activeTab === "documents"} 
          onClick={() => setActiveTab("documents")}
        >
          Documenti
        </TabButton>
        <TabButton 
          active={activeTab === "links"} 
          onClick={() => setActiveTab("links")}
        >
          Link
        </TabButton>
      </TabsContainer>

      <Content>
        {activeTab === "media" && (
          <div>
            <TimeLabel>QUESTO MESE</TimeLabel>
            <MediaGrid>
              {filteredMedia.map((item) => (
                <MediaItem key={item.id}>
                  {item.type === "image" && (
                    <MediaPreview>
                      <img src={item.preview} alt="Media preview" />
                      {item.size && (
                        <MediaDuration>{item.size}</MediaDuration>
                      )}
                    </MediaPreview>
                  )}
                </MediaItem>
              ))}
            </MediaGrid>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <TimeLabel>QUESTO MESE</TimeLabel>
            <ItemsList>
              {filteredMedia.map((item) => (
                <ListItem key={item.id}>
                  <ItemIcon>📄</ItemIcon>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemDate>
                      {item.timestamp.toLocaleDateString()}
                    </ItemDate>
                  </ItemInfo>
                </ListItem>
              ))}
            </ItemsList>
          </div>
        )}

        {activeTab === "links" && (
          <div>
            <TimeLabel>QUESTO MESE</TimeLabel>
            <ItemsList>
              {filteredMedia.map((item) => (
                <ListItem key={item.id}>
                  <LinkPreview>
                    <img src={item.preview} alt="Link preview" />
                  </LinkPreview>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemDate>
                      {item.timestamp.toLocaleDateString()}
                    </ItemDate>
                  </ItemInfo>
                </ListItem>
              ))}
            </ItemsList>
          </div>
        )}
      </Content>
    </MediaGalleryContainer>
  );
};

export default MediaGalleryPage;