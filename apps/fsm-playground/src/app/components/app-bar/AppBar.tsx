import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import styled from 'styled-components';

export const AppBar = () => {
  return (
    <MuiAppBar position="static">
      <StyledToolbar>
        <TimelineIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finite State Machine
        </Typography>
      </StyledToolbar>
    </MuiAppBar>
  );
};

const StyledToolbar = styled(Toolbar)`
    display: flex;
    gap: 1rem;

` 