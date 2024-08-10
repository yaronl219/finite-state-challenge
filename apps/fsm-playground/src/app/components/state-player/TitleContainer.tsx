import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export const TitleContainer = () => {
  return (
    <StyledContainer>
      <Typography variant={'h4'}>State machine player</Typography>
      <Typography>Select the starting state in the map on the right, and advance through the steps</Typography>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
