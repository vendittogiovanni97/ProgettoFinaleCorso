export interface ContactInfoPanelProps {
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

