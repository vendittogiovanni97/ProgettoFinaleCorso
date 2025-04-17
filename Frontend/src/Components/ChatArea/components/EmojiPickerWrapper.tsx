import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import * as S from "../../../styled/ChatAreaStyled";

interface EmojiPickerWrapperProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerWrapper: React.FC<EmojiPickerWrapperProps> = ({
  onEmojiSelect,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
  };

  return (
    <>
      <S.IconButtonStyled
        type="button"
        onClick={() => setIsPickerVisible(!isPickerVisible)}
      >
        {isPickerVisible ? "❌" : "😊"}
      </S.IconButtonStyled>

      {isPickerVisible && (
        <S.EmojiPickerContainerStyled>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </S.EmojiPickerContainerStyled>
      )}
    </>
  );
};

export default EmojiPickerWrapper;
