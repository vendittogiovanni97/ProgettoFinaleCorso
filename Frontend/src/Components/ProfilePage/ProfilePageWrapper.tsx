import React, { useContext } from "react";
import { Container, ProfileGrid } from "../../styled/ProfilePageStyle";
import { ThemeContext } from "../../context/ThemeContextDefinition";
// ...other imports

const ProfilePageWrapper: React.FC = () => {
  const { mode } = useContext(ThemeContext);

  // ...your logic for loading profile data, etc.

  return (
    <Container themeMode={mode}>
      <ProfileGrid>
        {/* ...your profile sidebar and content components */}
      </ProfileGrid>
    </Container>
  );
};

export default ProfilePageWrapper;