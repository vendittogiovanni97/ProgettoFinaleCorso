import React, { useState, useEffect, useRef } from "react";
import * as S from "../../../styled/ChatAreaStyled";
import * as AttachmentStyles from "../../../styled/AttachmentMenuStyled";
import AttachmentMenu from "./AttachmentMenu";
// Removing the unused import
import { useThemeContext } from "../../../context/ThemeContextDefinition";

interface AttachmentMenuWrapperProps {
  onFileSelect: (file: File, type: "image" | "document" | "video") => void;
}

const AttachmentMenuWrapper: React.FC<AttachmentMenuWrapperProps> = ({
  onFileSelect,
}) => {
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mode } = useThemeContext();

  // Use a separate ref for the menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside both the button and menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <AttachmentStyles.AttachmentWrapper>
      <S.IconButtonStyled
        type="button"
        ref={buttonRef}
        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
        style={{
          position: 'absolute',
          left: '-45px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: mode === 'dark' ? '#2a2a2a' : '#f5f5f5',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 215, 0, 0.2)' 
            : '1px solid rgba(0, 0, 0, 0.2)',
          color: mode === 'dark' ? '#ffd700' : '#333333',
          fontSize: '20px',
          transition: 'all 0.3s ease'
        }}
      >
        📎
      </S.IconButtonStyled>
      {showAttachmentMenu && (
        <AttachmentMenu
          isOpen={true}
          onClose={() => setShowAttachmentMenu(false)}
          onFileSelect={handleFileSelect}
          menuRef={menuRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </AttachmentStyles.AttachmentWrapper>
  );
};

export default AttachmentMenuWrapper;
