import { styled } from "@mui/material/styles";


export const SearchContainer = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff3cd',
    borderRadius: '20px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    '&:hover': {
      backgroundColor: '#ffe69c',
    }
  }));

  
export const SearchInput = styled('input')({
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    padding: '4px 8px',
    color: '#000',
    '&::placeholder': {
      color: '#666',
      opacity: 0.8,
    },
  });

