import React, { useState } from "react";
import "../css/ContactInfoPanel.css";
import MediaGalleryPage from "./MediaGalleryPage";

interface ContactInfoPanelProps {
  contact: {
    id: number;
    name: string;
    status: string;
    avatar: string;
    lastSeen: string;
    isOnline: boolean;
    phone?: string;
  };
  onClose: () => void;
  sharedMedia: Array<{
    id: number;
    type: "image" | "document" | "link";
    preview: string;
    name?: string;
    timestamp: Date;
    size?: string;
  }>;
}

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
    <div className="contact-info-panel">
      <div className="contact-info-header">
        <button className="icon-button" onClick={onClose}>
          <span>✕</span>
        </button>
        <h2>Info contatto</h2>
      </div>

      <div className="contact-info-content">
        <div className="contact-info-avatar-container">
          <div className="contact-info-avatar">
            {contact.avatar ? (
              <img src={contact.avatar} alt={contact.name} />
            ) : (
              <div className="avatar-placeholder">{contact.name.charAt(0)}</div>
            )}
          </div>
          <h3 className="contact-info-name">{contact.name}</h3>
          <p className="contact-info-phone">
            {contact.phone || "+39 123 456 7890"}
          </p>
        </div>

        <div className="contact-info-section">
          <h4>Info</h4>
          <p className="contact-info-status">{contact.status}</p>
        </div>

        <div className="contact-info-section">
          <div
            className="contact-info-media-header"
            onClick={handleMediaClick}
            style={{ cursor: "pointer" }}
          >
            <h4>Media, link e documenti</h4>
            <span className="contact-info-media-count">
              {sharedMedia.length}
            </span>
            <span className="contact-info-media-arrow">›</span>
          </div>

          <div
            className="contact-info-media-grid"
            onClick={handleMediaClick}
            style={{ cursor: "pointer" }}
          >
            {sharedMedia.slice(0, 3).map((media) => (
              <div className="contact-info-media-item" key={media.id}>
                <div className="media-preview">
                  {media.type === "image" && (
                    <img src={media.preview} alt="Media preview" />
                  )}
                  {media.type === "document" && (
                    <div className="document-preview">
                      <span>📄</span>
                    </div>
                  )}
                  {media.type === "link" && (
                    <div className="link-preview">
                      <span>🔗</span>
                    </div>
                  )}
                </div>
                {media.type === "image" && (
                  <span className="media-duration">{media.size}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-info-section">
          <div className="contact-info-option">
            <span className="contact-info-option-icon">⭐</span>
            <span className="contact-info-option-text">
              Messaggi importanti
            </span>
            <span className="contact-info-option-arrow">›</span>
          </div>
        </div>

        <div className="contact-info-section">
          <div className="contact-info-option">
            <span className="contact-info-option-icon">🔔</span>
            <span className="contact-info-option-text">Silenzia notifiche</span>
            <div className="contact-info-toggle">
              <div className="toggle-track">
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info-section">
          <div className="contact-info-option">
            <span className="contact-info-option-icon">⏱️</span>
            <span className="contact-info-option-text">Messaggi effimeri</span>
            <span className="contact-info-option-value">No</span>
            <span className="contact-info-option-arrow">›</span>
          </div>
        </div>

        <div className="contact-info-section">
          <div className="contact-info-option">
            <span className="contact-info-option-icon">🔒</span>
            <span className="contact-info-option-text">Crittografia</span>
          </div>
          <p className="contact-info-encryption-note">
            I messaggi sono crittografati end-to-end. Tocca per verificare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPanel;
