import useThemeColors from "../../../styled/BarraSuperioreStyled";
import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface IconInputSearchBarProps {
  onSearch: () => void;
}

const IconInputSearchBar: React.FC<IconInputSearchBarProps> = ({
  onSearch,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box>
      <IconButton
        aria-label="search"
        onClick={onSearch}
        sx={{ color: themeColors.primary , padding: '8px'}}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
export default IconInputSearchBar;
