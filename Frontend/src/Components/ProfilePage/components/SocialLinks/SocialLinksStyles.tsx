import styled from "styled-components";

export const SocialLinksContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const SocialLink = styled.a`
  display: flex;
  gap: 20px;
  margin-top: 25px;

  a {
    color: ${props => props.theme.colors.primary};
    font-size: 24px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.2);
      color: ${props => props.theme.colors.hoverColor};
    }
  }
`;