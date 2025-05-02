import React from "react";
import { Container, ProfileGrid } from "./ProfilePageStyles";
import Sidebar from "./components/Sidebar/Sidebar";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import useThemeColors from "../../styled/BarraSuperioreStyled";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeContext } from "../../context/ThemeContextDefinition";

const ProfilePageWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <ProfilePage />
    </ErrorBoundary>
  );
};

const ProfilePage: React.FC = () => {
  const themeColors = useThemeColors();
  const { mode } = React.useContext(ThemeContext); // <-- Add this line

  if (!themeColors) {
    return <div>Caricamento tema...</div>;
  }

  return (
    <Container $themeMode={mode}>
      <ProfileGrid>
        <Sidebar />
        <ProfileContent />
      </ProfileGrid>
    </Container>
  );
};

export default ProfilePageWrapper;