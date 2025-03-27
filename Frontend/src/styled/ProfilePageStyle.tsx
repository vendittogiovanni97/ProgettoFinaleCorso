import styled from 'styled-components';
import { keyframes } from 'styled-components';



export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #1e1e1e 100%);
  padding: 60px 20px;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', 'Arial', sans-serif;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  background: rgba(30, 30, 30, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

export const ProfileSidebar = styled.div`
  background: rgba(255, 215, 0, 0.05);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(255, 215, 0, 0.1);
`;

export const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid #ffd700;
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
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;

  a {
    color: #ffd700;
    font-size: 24px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.2);
      color: #ffeb3b;
    }
  }
`;

export const ProfileContent = styled.div`
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
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
    color: #ffd700;
    flex-grow: 1;
  }

  input {
    flex-grow: 1;
    padding: 10px;
    background: transparent;
    border: 1px solid rgba(255, 215, 0, 0.3);
    color: #ffd700;
    border-radius: 6px;
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #ffd700;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    }
  }

  .edit-icon {
    color: #ffd700;
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
  color: #ffd700;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 6px;
  padding: 15px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;
