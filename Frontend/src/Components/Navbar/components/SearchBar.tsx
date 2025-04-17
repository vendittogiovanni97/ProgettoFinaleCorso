import IconInputSearchBar from "./IconInputSearchBar";
import { styled, alpha } from "@mui/material/styles";
import useThemeColors from "../../../styled/BarraSuperioreStyled";
import React from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";

const SearchBar = () => {
  const themeColors = useThemeColors(); // Usa i colori dinamici basati sul tema
  const [searchValue, setSearchValue] = React.useState<string>("");
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(themeColors.primary, 0.15),
    "&:hover": {
      backgroundColor: alpha(themeColors.primary, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: themeColors.textLight,
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleSearch = () => {
    const trimmedSearch = searchValue.trim();
    if (trimmedSearch) {
      navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    }
  };


  return (
    <Search
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        maxWidth: "400px",
      }}
    >
      <StyledInputBase
        placeholder="Search…"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        sx={{ flex: 1 }}
      />
      <IconInputSearchBar onSearch={handleSearch} />
    </Search>
  );
};

export default SearchBar;