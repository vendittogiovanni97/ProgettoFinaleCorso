import styled from "styled-components";
import { keyframes } from "styled-components";

export const ProfileContent = styled.div`
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  background: ${props => props.theme.colors.backgroundLight};
`;



