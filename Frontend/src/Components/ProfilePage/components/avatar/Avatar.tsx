import React from 'react';
import { useTheme } from '@mui/material/styles';
import { AvatarContainer } from './AvatarStyles';

const Avatar: React.FC = () => {
  const theme = useTheme();

  if (!theme) {
    return <div>Caricamento...</div>;
  }

  return (
    <AvatarContainer>
      <img src="/path/to/avatar.jpg" alt="Profile Avatar" />
    </AvatarContainer>
  );
};

export default Avatar;