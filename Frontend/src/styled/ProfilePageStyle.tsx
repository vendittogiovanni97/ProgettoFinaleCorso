import styled from "styled-components";
import { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 60px 20px;
  justify-content: center;
  align-items: center;
  font-family: "Inter", "Arial", sans-serif;
  background-image: url(/pics/image1.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  background: ${props => props.theme.colors.backgroundDark};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  max-height: 1200px;
`;

export const ProfileSidebar = styled.div`
  background: ${props => `${props.theme.colors.primary}0d`};
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${props => `${props.theme.colors.primary}1a`};
`;

export const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.primary};
  overflow: hidden;
  margin-bottom: 25px;
  transition: all 0.4s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px ${props => `${props.theme.colors.primary}66`};
  }
`;

export const H2Style = styled.div`
  color: ${props => props.theme.colors.textLight};
`;

export const SocialLinks = styled.div`
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

export const ProfileContent = styled.div`
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  background: ${props => props.theme.colors.backgroundLight};
`;

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

export const ProfileSection = styled.div`
  background: ${props => `${props.theme.colors.backgroundDark}0a`};
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

export const EditableField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  .field-content {
    display: flex;
    align-items: center;
    gap: 15px;
    color: ${props => props.theme.colors.textLight};
    flex-grow: 1;

    svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  input {
    flex-grow: 1;
    padding: 10px;
    background: transparent;
    border: 1px solid ${props => `${props.theme.colors.primary}4d`};
    color: ${props => props.theme.colors.textLight};
    border-radius: 6px;
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 10px ${props => `${props.theme.colors.primary}4d`};
    }
  }

  .edit-icon {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export const BioSection = styled(ProfileSection)`
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
