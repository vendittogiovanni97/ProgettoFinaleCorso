import styled from "styled-components";

export const Container = styled.div<{ $themeMode?: string }>`
  display: flex;
  min-height: 100vh;
  padding: 60px 20px;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", "Inter", sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
    url(${props => props.$themeMode === 'light' ? '/pics/image2.jpg' : '/pics/image1.jpg'});
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
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  max-height: 1200px;
`;

export const H2Style = styled.div`
  color: ${props => props.theme.colors.textLight};
`;

// Add this if you have a divider component
export const VerticalDivider = styled.div`
  width: 2px;
  background: ${props => props.theme.colors.primary}; // or another theme color
  height: 100%;
  margin: 0 16px;
`;