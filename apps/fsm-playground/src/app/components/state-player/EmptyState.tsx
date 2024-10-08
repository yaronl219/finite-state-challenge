import { Typography } from '@mui/material';
import styled from 'styled-components';

export const EmptyState = () => {
  return (
    <StyledContainer>
      <Typography>No active state</Typography>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
