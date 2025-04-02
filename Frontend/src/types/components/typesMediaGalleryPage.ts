

export interface MediaGalleryPageProps {
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