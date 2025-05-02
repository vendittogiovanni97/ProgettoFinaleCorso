import styled, { keyframes } from "styled-components";

// Enhanced animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Removed shimmer keyframes animation

export const Container = styled.div<{ themeMode?: string }>`
  display: flex;
  min-height: 100vh;
  padding: 60px 20px;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", "Inter", sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
    url(${props => props.themeMode === 'light' ? '/pics/image2.jpg' : '/pics/image1.jpg'});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  transition: all 0.5s ease;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  background: ${props => props.theme.colors.backgroundDark || '#1a1a1a'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4);
  max-height: 1200px;
  animation: ${fadeInUp} 0.8s cubic-bezier(.23,1.01,.32,1) both;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  
  &:hover {
    box-shadow: 0 25px 100px rgba(0, 0, 0, 0.7), 0 15px 40px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
  }
`;

export const ProfileSidebar = styled.div`
  background: linear-gradient(135deg, 
    ${props => `${props.theme.colors.primary}22`} 0%, 
    ${props => props.theme.colors.backgroundLight} 100%);
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${props => `${props.theme.colors.primary}1a`};
  min-width: 320px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, 
      transparent, 
      ${props => props.theme.colors.primary}66, 
      transparent);
  }
`;

export const Avatar = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 5px solid ${props => props.theme.colors.primary};
  overflow: hidden;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: 0 0 30px ${props => `${props.theme.colors.primary}66`};
  }
`;

export const StatusBadge = styled.div<{ online?: boolean }>`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.online ? "#4caf50" : "#f44336"};
  border: 3px solid ${props => props.theme.colors.backgroundDark};
  box-shadow: 0 0 0 2px ${props => props.online ? "#4caf50" : "#f44336"};
  animation: ${props => props.online ? pulse : 'none'} 2s infinite ease-in-out;
`;

export const H2Style = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const JobTitle = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    letter-spacing: 1px;
    transform: translateY(-1px);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0 0 0;
  
  button {
    background: ${props => props.theme.colors.primary};
    color: #222;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
      transform: translateX(-100%);
    }
    
    &:hover {
      background: ${props => props.theme.colors.hoverColor};
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 7px 14px rgba(0,0,0,0.2);
      
      &::after {
        transform: translateX(100%);
        transition: transform 0.6s ease;
      }
    }
    
    &:active {
      transform: translateY(1px);
      box-shadow: 0 3px 8px rgba(0,0,0,0.2);
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  a {
    color: ${props => props.theme.colors.primary};
    font-size: 26px;
    transition: all 0.4s cubic-bezier(.23,1.01,.32,1);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${props => props.theme.colors.primary};
      transition: width 0.3s ease;
    }

    &:hover {
      transform: scale(1.3) rotate(-10deg);
      color: ${props => props.theme.colors.hoverColor};
      
      &::before {
        width: 100%;
      }
    }
  }
`;

export const ProfileContent = styled.div`
  padding: 48px 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 0 16px 16px 0;
  position: relative;
  overflow: auto;
  max-height: 800px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => `${props.theme.colors.backgroundLight}80`};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => `${props.theme.colors.primary}40`};
    border-radius: 10px;
    
    &:hover {
      background: ${props => `${props.theme.colors.primary}80`};
    }
  }
`;

export const ProfileSection = styled.div`
  background: ${props => `${props.theme.colors.backgroundDark || '#1a1a1a'}0a`};
  border-radius: 12px;
  padding: 28px;
  transition: all 0.4s cubic-bezier(.23,1.01,.32,1);
  animation: ${fadeInUp} 0.7s cubic-bezier(.23,1.01,.32,1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${props => props.theme.colors.textLight};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid ${props => `${props.theme.colors.primary}15`};

  &:hover {
    background: ${props => `${props.theme.colors.backgroundDark}1a`};
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    border-color: ${props => `${props.theme.colors.primary}30`};
  }
`;

export const EditableField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: ${props => `${props.theme.colors.backgroundDark}15`};
  }

  .field-content {
    display: flex;
    align-items: center;
    gap: 60px; // Significantly increased from 35px for much more separation
    color: ${props => props.theme.colors.textLight};
    flex-grow: 1;

    svg {
      color: ${props => props.theme.colors.primary};
      transition: transform 0.3s ease;
      font-size: 1.5rem; // Larger icons
      min-width: 30px; // Increased minimum width
      margin-right: 15px; // Additional right margin
    }
    
    &:hover svg {
      transform: scale(1.2) rotate(5deg);
    }
  }

  input {
    flex-grow: 1;
    padding: 12px;
    background: transparent;
    border: 1px solid ${props => `${props.theme.colors.primary}4d`};
    color: ${props => props.theme.colors.textLight};
    border-radius: 8px;
    transition: all 0.3s ease;
    width: 100%;
    font-family: "Poppins", "Inter", sans-serif;
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 15px ${props => `${props.theme.colors.primary}4d`};
      background: ${props => `${props.theme.colors.backgroundDark}15`};
    }
  }
`;

export const BioSection = styled(ProfileSection)`
  grid-column: span 2;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 2px;
    background: linear-gradient(to right, 
      transparent, 
      ${props => `${props.theme.colors.primary}30`}, 
      transparent);
  }
`;

export const BioTextarea = styled.textarea`
  width: 100%;
  max-width: 800px;
  background: transparent;
  color: ${props => props.theme.colors.textLight};
  border: 1px solid ${props => `${props.theme.colors.primary}4d`};
  border-radius: 8px;
  padding: 16px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: "Poppins", "Inter", sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px ${props => `${props.theme.colors.primary}4d`};
    background: ${props => `${props.theme.colors.backgroundDark}15`};
  }
`;
