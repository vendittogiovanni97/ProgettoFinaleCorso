import React, { useContext } from "react";
import ProfileSidebar from "./SidebarStyles";
import Avatar from "../avatar/Avatar";
import { H2Style } from "../../ProfilePageStyles";
import { ThemeContext } from "../../../../context/ThemeContextDefinition";
import SocialLinks from "../SocialLinks/SocialLinks";

const Sidebar: React.FC = () => {
  const { mode } = useContext(ThemeContext);
  // Optionally, if you want to use theme colors from styled-components theme:
  // const theme = useTheme(); // from styled-components

  const profile = {
    firstName: "Alec",
    lastName: "Thompson",
    jobTitle: "Professional Developer"
  };

  return (
    <ProfileSidebar>
      <Avatar />
      <H2Style>
        {profile.firstName} {profile.lastName}
      </H2Style>
      <p style={{ marginTop: "10px" }}>
        {profile.jobTitle}
      </p>
      <SocialLinks />
    </ProfileSidebar>
  );
};

export default Sidebar;