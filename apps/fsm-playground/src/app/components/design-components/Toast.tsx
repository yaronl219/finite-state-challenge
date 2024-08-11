import React from 'react';
import { useUiContext } from '../../context/ui-context/UiContext';
import { Alert, Snackbar } from '@mui/material';

export const Toast = () => {
  const { setIsToastDisplayed, isToastDisplayed } = useUiContext();

  const handleClose = () => setIsToastDisplayed(false)
  return (
    <Snackbar
      open={isToastDisplayed}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Oops. Something went wrong
      </Alert>
    </Snackbar>
  );
};
