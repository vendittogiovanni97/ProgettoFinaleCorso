import React from "react";
import { useTranslation } from 'react-i18next';
import useThemeColors from "../../../styled/BarraSuperioreStyled";
import IconInputSearchBar from "./IconInputSearchBar";
import { useNavigate } from "react-router-dom";
import { SearchContainer, SearchInput } from "../styled/SearchBarStyled";



const SearchBar = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();
  const themeColors = useThemeColors();

  const handleSearch = () => {
    const trimmedSearch = searchValue.trim();
    if (trimmedSearch) {
      navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
      setSearchValue("");
    }
  };
  return (
    <SearchContainer>
      <SearchInput
        placeholder={t('navbar.search')}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        autoComplete="off"
      />
      <IconInputSearchBar onSearch={handleSearch} />
    </SearchContainer>
  );
};

export default SearchBar;