import React, { useRef, useCallback } from "react";
import * as S from "../../../styled/AttachmentMenuStyled";

type AttachmentMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File, type: "image" | "document" | "video") => void;
  menuRef: React.RefObject<HTMLDivElement>;
};

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({
  isOpen,
  onClose,
  onFileSelect,
  menuRef
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "document" | "video") => {
      if (e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files[0], type);
        onClose();
        e.target.value = ''; // Reset input dopo la selezione
      }
    },
    [onFileSelect, onClose]
  );

  const triggerFileInput = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept =
        type === "image"
          ? "image/*"
          : type === "document"
            ? ".pdf,.doc,.docx,.txt"
            : "video/*";
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <S.AttachmentMenuContainer 
        ref={menuRef}
        onClick={(e) => e.stopPropagation()} // Previene la propagazione del click
      >
        <S.AttachmentMenuItem onClick={() => triggerFileInput("image")}>
          <S.AttachmentIcon>🖼️</S.AttachmentIcon>
          <span>Image</span>
        </S.AttachmentMenuItem>

        <S.AttachmentMenuItem onClick={() => triggerFileInput("document")}>
          <S.AttachmentIcon>📄</S.AttachmentIcon>
          <span>Document</span>
        </S.AttachmentMenuItem>

        <S.AttachmentMenuItem onClick={() => triggerFileInput("video")}>
          <S.AttachmentIcon>🎥</S.AttachmentIcon>
          <span>Video</span>
        </S.AttachmentMenuItem>
      </S.AttachmentMenuContainer>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const type = fileInputRef.current?.accept.includes("image")
            ? "image"
            : fileInputRef.current?.accept.includes("pdf")
              ? "document"
              : "video";
          handleFileChange(e, type);
        }}
      />
    </>
  );
};

export default AttachmentMenu;
