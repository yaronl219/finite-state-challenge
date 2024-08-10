import React from 'react';
import styled from 'styled-components';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { TitleContainer } from './TitleContainer';
import { StatePlayer } from './StatePlayer';
import { EmptyState } from './EmptyState';



export const StatePlayerContainer: React.FC = () => {
  const { activeState, onAdvanceStep, onRenameNode } = useStateMachineContext();
  return (
    <StyledContainer>
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
