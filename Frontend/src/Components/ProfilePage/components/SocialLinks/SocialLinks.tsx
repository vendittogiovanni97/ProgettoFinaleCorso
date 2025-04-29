import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SocialLinksContainer, SocialLink } from "./SocialLinksStyles";

const SocialLinks: React.FC = () => {
  return (
    <SocialLinksContainer>
      <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
      <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </SocialLink>
      <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;