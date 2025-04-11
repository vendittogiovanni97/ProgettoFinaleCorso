// ContactInfoPanel.styles.ts
// ContactInfoPanel.styles.ts
import styled from "styled-components";

export const ContactInfoPanelContainer = styled.div`
  width: 380px;
  height: 100%;
  background-color: var(--background-light);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 15;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
  }
`;

export const ContactInfoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--background-light);
  color: var(--text-light);
  border-bottom: 1px solid var(--border-color);

  h2 {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin-right: 40px;
  }
`;

export const ContactInfoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ContactInfoAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

export const ContactInfoAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-dark);
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
  color: var(--text-light);
  background-color: var(--primary-color);
`;

export const ContactInfoName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-light);
`;

export const ContactInfoPhone = styled.p`
  font-size: 14px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const ContactInfoSection = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
`;

export const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-light);
`;

export const ContactInfoStatus = styled.p`
  font-size: 14px;
  color: var(--text-light);
`;

export const ContactInfoMediaHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;

export const MediaCount = styled.span`
  margin-left: auto;
  font-size: 14px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const MediaArrow = styled.span`
  font-size: 18px;
  margin-left: 10px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const ContactInfoMediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  cursor: pointer;
`;

export const MediaItem = styled.div`
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  background-color: var(--background-dark);
  border-radius: 5px;
`;

export const MediaPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const MediaImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DocumentPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

export const LinkPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
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

export const ContactInfoOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

export const OptionIcon = styled.span`
  font-size: 20px;
  margin-right: 15px;
  width: 24px;
  text-align: center;
`;

export const OptionText = styled.span`
  flex: 1;
  font-size: 14px;
  color: var(--text-light);
`;

export const OptionValue = styled.span`
  font-size: 14px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const OptionArrow = styled.span`
  font-size: 18px;
  margin-left: 10px;
  color: var(--text-light);
  opacity: 0.7;
`;

export const ContactInfoToggle = styled.div`
  width: 40px;
  height: 20px;
  position: relative;
`;

export const ToggleTrack = styled.div`
  width: 100%;
  height: 14px;
  border-radius: 7px;
  background-color: var(--border-color);
  position: absolute;
  top: 3px;
`;

export const ToggleThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--text-light);
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

export const EncryptionNote = styled.p`
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
  margin-top: 5px;
  padding-left: 39px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
