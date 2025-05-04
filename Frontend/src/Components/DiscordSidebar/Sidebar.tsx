import React from "react";
import * as S from "../../styled/DiscordSidebarStyled";
import { useNavigate } from "react-router-dom";

const DiscordSidebar: React.FC = () => {
  const navigate = useNavigate();
  const settings = ["Profile", "Settings", "Amici", "Logout"];

  const handleMenuSelect = (setting: string) => {
    if (setting === "Logout") {
      navigate("/login");
    }
    if (setting === "Profile") {
      navigate("/profilepage");
    }
    if (setting === "Settings") {
      navigate("/settings");
    }
    if (setting === "Amici") {
      navigate("/amici");
    }
  };

  return (
    <S.DiscordSidebarContainer>
      <S.SidebarMenuList>
        {settings.map((setting) => (
          <S.SidebarMenuItem
            key={setting}
            onClick={() => handleMenuSelect(setting)}
          >
            {setting}
          </S.SidebarMenuItem>
        ))}
      </S.SidebarMenuList>
    </S.DiscordSidebarContainer>
  );
};

export default DiscordSidebar;
