import React from "react";
import ProfileSidebar from "./SidebarStyles";
import Avatar from "../avatar/Avatar";
import { H2Style } from "../../ProfilePageStyles";
import useThemeColors from "../../../../styled/BarraSuperioreStyled";
import SocialLinks from "../SocialLinks/SocialLinks";

const Sidebar: React.FC = () => {
  const themeColors = useThemeColors();
  const profile = {
    firstName: "Alec",
    lastName: "Thompson",
    jobTitle: "Professional Developer"
  };

  return (
    <ProfileSidebar>
      <Avatar />
      <H2Style style={{color: themeColors?.textLight}}>
        {profile.firstName} {profile.lastName}
      </H2Style>
      <p style={{ color: themeColors?.primary, marginTop: "10px" }}>
        {profile.jobTitle}
      </p>
      <SocialLinks />
    </ProfileSidebar>
  );
};

export default Sidebar;