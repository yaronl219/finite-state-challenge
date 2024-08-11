import React from 'react';
import styled from 'styled-components';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { TitleContainer } from './TitleContainer';
import { StatePlayer } from './StatePlayer';
import { EmptyState } from './EmptyState';
import { Paper } from '@mui/material';

export const StatePlayerContainer: React.FC = () => {
  const { activeState, onAdvanceStep, onRenameNode } = useStateMachineContext();
  return (
    <StyledContainer square>
      <TitleContainer />
      {activeState ? (
        <StatePlayer
          onAdvanceStep={onAdvanceStep}
          onRenameNode={onRenameNode}
          activeState={activeState}
        />
      ) : (
        <EmptyState />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
