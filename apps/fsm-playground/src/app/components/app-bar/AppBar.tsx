import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import styled from 'styled-components';
import { UserAvatar } from './UserAvatar';

export const AppBar = () => {
  return (
    <MuiAppBar position="static">
      <InnerContainer>
        <StyledToolbar>
          <TimelineIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Finite State Machine Playground
          </Typography>
        </StyledToolbar>
        <UserAvatar />
      </InnerContainer>
    </MuiAppBar>
  );
};

const StyledToolbar = styled(Toolbar)`
  display: flex;
  gap: 1rem;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
