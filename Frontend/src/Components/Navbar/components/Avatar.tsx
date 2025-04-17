import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuAvatar from "./MenuAvatar";
import React from "react";

const AvatarSideBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Eleonora Baroni" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <MenuAvatar anchorEl={anchorElUser} setAnchorEl={setAnchorElUser} />
    </Box>
  );
};
export default AvatarSideBar;
