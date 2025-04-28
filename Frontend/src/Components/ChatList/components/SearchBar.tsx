import React, { useRef, useEffect } from 'react';
import { SearchContainer, SearchInput, SearchButton } from '../../../styled/ChatListStyled';
import IconInputSearchBar from '../../Navbar/components/IconInputSearchBar';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mantiene il focus quando il componente viene montato
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <SearchContainer style={{ 
        padding: '4px 8px',
        height: '47px',
        maxWidth: '250px',
        margin: '0 auto'
      }}>
      <SearchInput
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Cerca..."
        autoComplete="off"
        style={{
            fontSize: '13px',
            padding: '4px 8px',
        }}
      />
      <SearchButton onClick={onSearch} style={{padding: '2px'}}>
      <IconInputSearchBar onSearch={onSearch} />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;