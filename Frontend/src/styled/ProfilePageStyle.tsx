import styled from "styled-components";
import { keyframes } from "styled-components";

export const ProfileContent = styled.div`
  padding: 48px 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: ${props => props.theme.colors.backgroundLight};
`;



