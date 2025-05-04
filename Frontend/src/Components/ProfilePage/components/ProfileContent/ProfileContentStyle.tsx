import styled from "styled-components";
import { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ProfileContentContainer = styled.div`
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  background: ${props => props.theme.colors.backgroundLight};
`;

export const ProfileSection = styled.div`
  background: ${props => `${props.theme.colors.backgroundDark || '#1a1a1a'}0a`};
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${props => props.theme.colors.textLight};

  &:hover {
    background: ${props => `${props.theme.colors.backgroundDark}1a`};
    transform: translateY(-5px);
  }
`;