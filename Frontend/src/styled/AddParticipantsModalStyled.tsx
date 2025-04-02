import { styled } from "@mui/material/styles";
import { Typography, ListItem, Avatar, ListItemText } from "@mui/material";

export const StyleTypography = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "#ffd700",
}));

export const StyleListItem = styled(ListItem)(() => ({
  color: "#ffd700",
}));

export const StyleAvatar = styled(Avatar)(() => ({
  backgroundColor: "#ffd700",
  textAlign: "center",
  color: "black",
  fontWeight: "bold",
}));

export const StyleListItemText = styled(ListItemText)(() => ({
  color: "white",
}));
