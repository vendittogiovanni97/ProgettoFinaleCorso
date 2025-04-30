import React from "react";
import { Container, ProfileGrid } from "./ProfilePageStyles";
import Sidebar from "./components/Sidebar/Sidebar";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import useThemeColors from "../../styled/BarraSuperioreStyled";
import ErrorBoundary from "./ErrorBoundary";

const ProfilePageWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <ProfilePage />
    </ErrorBoundary>
  );
};

const ProfilePage: React.FC = () => {
  const themeColors = useThemeColors();

  if (!themeColors) {
    return <div>Caricamento tema...</div>;
  }

  return (
    <Container>
      <ProfileGrid>
        <Sidebar />
        <ProfileContent />
      </ProfileGrid>
    </Container>
  );
};

export default ProfilePageWrapper;