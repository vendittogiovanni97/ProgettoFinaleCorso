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
`;

export const ProfileSection = styled.div`
  background: rgba(26, 26, 26, 0.1);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:hover {
    background: rgba(26, 26, 26, 0.15);
    transform: translateY(-5px);
  }
`;