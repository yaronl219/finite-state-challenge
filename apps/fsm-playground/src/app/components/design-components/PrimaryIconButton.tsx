import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

interface PrimaryIconButtonProps extends IconButtonProps {
  children: React.ReactNode;
}

export const PrimaryIconButton: React.FC<PrimaryIconButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <IconButton
      sx={{
        backgroundColor: 'white',
        '&:hover': { backgroundColor: '#F3F3F3' },
      }}
      {...rest}
    >
      {children}
    </IconButton>
  );
};
