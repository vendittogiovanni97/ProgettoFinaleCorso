import React, { useRef } from "react";
import useOutsideClick from "../../../hook/useOutsideClick";
import * as S from "../../../styled/AttachmentMenuStyled";

type AttachmentMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File, type: "image" | "document" | "video") => void;
};

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({
  isOpen,
  onClose,
  onFileSelect,
}) => {
  const menuRef = useOutsideClick(onClose);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "document" | "video"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0], type);
      onClose();
    }
  };

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
      <S.AttachmentMenuContainer ref={menuRef}>
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
