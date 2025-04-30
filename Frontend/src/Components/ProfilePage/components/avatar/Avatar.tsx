import React from "react";
import { Avatar as AvatarStyled } from "./AvatarStyles";

const Avatar: React.FC = () => {
  return (
    <AvatarStyled>
      <img src="/pics/profile-placeholder.jpg" alt="Profile" />
    </AvatarStyled>
  );
};

export default Avatar;