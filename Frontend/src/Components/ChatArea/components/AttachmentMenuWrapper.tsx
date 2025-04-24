import React, { useState } from "react";
import * as S from "../../../styled/ChatAreaStyled";
import * as AttachmentStyles from "../../../styled/AttachmentMenuStyled";
import AttachmentMenu from "./AttachmentMenu";
import useOutsideClick from "../../../hook/useOutsideClick";

interface AttachmentMenuWrapperProps {
  onFileSelect: (file: File, type: "image" | "document" | "video") => void;
}

const AttachmentMenuWrapper: React.FC<AttachmentMenuWrapperProps> = ({
  onFileSelect,
}) => {
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const attachmentRef = useOutsideClick(() => setShowAttachmentMenu(false));

  const handleFileSelect = (
    file: File,
    type: "image" | "document" | "video"
  ) => {
    onFileSelect(file, type);
    setShowAttachmentMenu(false);
  };

  return (
    <AttachmentStyles.AttachmentWrapper ref={attachmentRef}>
      <S.IconButtonStyled
        type="button"
        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
      >
        📎
      </S.IconButtonStyled>
      <AttachmentMenu
        isOpen={showAttachmentMenu}
        onClose={() => setShowAttachmentMenu(false)}
        onFileSelect={handleFileSelect}
      />
    </AttachmentStyles.AttachmentWrapper>
  );
};

export default AttachmentMenuWrapper;
