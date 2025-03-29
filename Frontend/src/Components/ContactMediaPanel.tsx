import React, { useState } from "react";
import MediaGalleryPage from "./MediaGalleryPage";
import * as S from "../styled/ContactMediaPanelStyled";
import { ContactInfoPanelProps } from "../types/components/typesContactMediaPanel";

const ContactInfoPanel: React.FC<ContactInfoPanelProps> = ({
  contact,
  onClose,
  sharedMedia,
}) => {
  const [showMediaGallery, setShowMediaGallery] = useState(false);

  const mediaByType = {
    image: sharedMedia.filter((item) => item.type === "image"),
    document: sharedMedia.filter((item) => item.type === "document"),
    link: sharedMedia.filter((item) => item.type === "link"),
  };

  const handleMediaClick = () => {
    setShowMediaGallery(true);
  };

  const handleCloseMediaGallery = () => {
    setShowMediaGallery(false);
  };

  if (showMediaGallery) {
    return (
      <MediaGalleryPage
        media={sharedMedia}
        onClose={handleCloseMediaGallery}
        contactName={contact.name}
      />
    );
  }

  return (
    <S.ContactInfoPanelContainer>
      <S.ContactInfoHeader>
        <S.IconButton onClick={onClose}>
          <span>✕</span>
        </S.IconButton>
        <h2>Info contatto</h2>
      </S.ContactInfoHeader>

      <S.ContactInfoContent>
        <S.ContactInfoAvatarContainer>
          <S.ContactInfoAvatar>
            {contact.avatar ? (
              <S.AvatarImg src={contact.avatar} alt={contact.name} />
            ) : (
              <S.AvatarPlaceholder>{contact.name.charAt(0)}</S.AvatarPlaceholder>
            )}
          </S.ContactInfoAvatar>
          <S.ContactInfoName>{contact.name}</S.ContactInfoName>
          <S.ContactInfoPhone>
            {contact.phone || "+39 123 456 7890"}
          </S.ContactInfoPhone>
        </S.ContactInfoAvatarContainer>

        <S.ContactInfoSection>
          <S.SectionTitle>Info</S.SectionTitle>
          <S.ContactInfoStatus>{contact.status}</S.ContactInfoStatus>
        </S.ContactInfoSection>

        <S.ContactInfoSection>
          <S.ContactInfoMediaHeader onClick={handleMediaClick}>
            <S.SectionTitle>Media, link e documenti</S.SectionTitle>
            <S.MediaCount>{sharedMedia.length}</S.MediaCount>
            <S.MediaArrow>›</S.MediaArrow>
          </S.ContactInfoMediaHeader>

          <S.ContactInfoMediaGrid onClick={handleMediaClick}>
            {sharedMedia.slice(0, 3).map((media) => (
              <S.MediaItem key={media.id}>
                <S.MediaPreview>
                  {media.type === "image" && (
                    <S.MediaImg src={media.preview} alt="Media preview" />
                  )}
                  {media.type === "document" && (
                    <S.DocumentPreview>
                      <span>📄</span>
                    </S.DocumentPreview>
                  )}
                  {media.type === "link" && (
                    <S.LinkPreview>
                      <span>🔗</span>
                    </S.LinkPreview>
                  )}
                </S.MediaPreview>
                {media.type === "image" && (
                  <S.MediaDuration>{media.size}</S.MediaDuration>
                )}
              </S.MediaItem>
            ))}
          </S.ContactInfoMediaGrid>
        </S.ContactInfoSection>
      </S.ContactInfoContent>
    </S.ContactInfoPanelContainer>
  );
};

export default ContactInfoPanel;