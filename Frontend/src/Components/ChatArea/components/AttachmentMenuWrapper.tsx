import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

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
        style={{
          position: 'absolute',
          left: '-45px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#2a2a2a',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          color: '#ffd700',
          fontSize: '20px'
        }}
      >
        📎
      </S.IconButtonStyled>
      <AttachmentMenu
        isOpen={showAttachmentMenu}
        onClose={() => setShowAttachmentMenu(false)}
        onFileSelect={handleFileSelect} menuRef={attachmentRef as React.RefObject<HTMLDivElement>} />
    </AttachmentStyles.AttachmentWrapper>
  );
};

export default AttachmentMenuWrapper;
