import styled from "styled-components";

export const SocialLinksContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const SocialLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;