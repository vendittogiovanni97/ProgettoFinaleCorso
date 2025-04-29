import styled from "styled-components";
import { ProfileSection } from "../ProfileContent/ProfileContentStyle";

export const BioSectionContainer = styled(ProfileSection)`
  grid-column: span 2;
`;

export const BioTextarea = styled.textarea`
  width: 100%;
  max-width: 800px;
  background: transparent;
  color: ${props => props.theme.colors.textLight};
  border: 1px solid ${props => `${props.theme.colors.primary}4d`};
  border-radius: 6px;
  padding: 15px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 10px ${props => `${props.theme.colors.primary}4d`};
  }
`;