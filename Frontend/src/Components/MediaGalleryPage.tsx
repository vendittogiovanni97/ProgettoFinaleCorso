import React, { useState } from "react";
import "../css/MediaGalleryPage.css";

interface MediaGalleryPageProps {
  media: Array<{
    id: number;
    type: "image" | "document" | "link";
    preview: string;
    name?: string;
    timestamp: Date;
    size?: string;
  }>;
  onClose: () => void;
  contactName: string;
}

const MediaGalleryPage: React.FC<MediaGalleryPageProps> = ({
  media,
  onClose,
  contactName,
}) => {
  const [activeTab, setActiveTab] = useState<"media" | "documents" | "links">(
    "media"
  );

  const filteredMedia = media.filter((item) => {
    if (activeTab === "media") return item.type === "image";
    if (activeTab === "documents") return item.type === "document";
    if (activeTab === "links") return item.type === "link";
    return true;
  });

  return (
    <div className="media-gallery-page">
      <div className="media-gallery-header">
        <button className="icon-button" onClick={onClose}>
          <span>←</span>
        </button>
        <h2>{contactName}</h2>
      </div>

      <div className="media-gallery-tabs">
        <button
          className={`tab-button ${activeTab === "media" ? "active" : ""}`}
          onClick={() => setActiveTab("media")}
        >
          Media
        </button>
        <button
          className={`tab-button ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          Documenti
        </button>
        <button
          className={`tab-button ${activeTab === "links" ? "active" : ""}`}
          onClick={() => setActiveTab("links")}
        >
          Link
        </button>
      </div>

      <div className="media-gallery-content">
        {activeTab === "media" && (
          <div className="media-section">
            <div className="media-time-label">QUESTO MESE</div>
            <div className="media-grid">
              {filteredMedia.map((item) => (
                <div className="media-item" key={item.id}>
                  {item.type === "image" && (
                    <div className="media-preview">
                      <img src={item.preview} alt="Media preview" />
                      {item.size && (
                        <span className="media-duration">{item.size}</span>
                      )}
                    </div>
                  )}
                  {item.type === "document" && (
                    <div className="document-preview">
                      <span className="document-icon">📄</span>
                      <span className="document-name">{item.name}</span>
                    </div>
                  )}
                  {item.type === "link" && (
                    <div className="link-preview">
                      <span className="link-icon">🔗</span>
                      <span className="link-name">{item.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="documents-section">
            <div className="media-time-label">QUESTO MESE</div>
            <div className="documents-list">
              {filteredMedia.map((item) => (
                <div className="document-item" key={item.id}>
                  <div className="document-icon">📄</div>
                  <div className="document-info">
                    <div className="document-name">{item.name}</div>
                    <div className="document-date">
                      {item.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "links" && (
          <div className="links-section">
            <div className="media-time-label">QUESTO MESE</div>
            <div className="links-list">
              {filteredMedia.map((item) => (
                <div className="link-item" key={item.id}>
                  <div className="link-preview">
                    <img src={item.preview} alt="Link preview" />
                  </div>
                  <div className="link-info">
                    <div className="link-name">{item.name}</div>
                    <div className="link-date">
                      {item.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGalleryPage;
