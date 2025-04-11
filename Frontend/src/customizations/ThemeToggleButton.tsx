import React from 'react';
import { useThemeContext } from '../context/ThemeContextDefinition';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggleButton: React.FC = () => {
  const { mode, toggleColorMode } = useThemeContext();
  
  return (
    <Tooltip title={mode === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;