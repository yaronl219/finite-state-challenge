import { StateNode } from '@fsm-challenge/fsm';
import React from 'react';
import { ActiveState } from '../../types/active-state';
import styled from 'styled-components';
import { StateNodeContainer } from '../state-node/StateNodeContainer';
import { Button } from '@mui/material';

interface StatePlayerContainerProps<T> {
  activeState: ActiveState<T>;
  onClickNextState: (id: string) => void;
}

export const StatePlayerContainer: React.FC<
  StatePlayerContainerProps<unknown>
> = ({ activeState, onClickNextState }) => {
  return (
    <StyledContainer>
      <StateNodeContainer title={activeState.name} isActive={true} />
      <ButtonContainer>
        {activeState.nextStates.map((nextState) => (
          <Button
            variant="contained"
            key={nextState.id}
            onClick={() => onClickNextState(nextState.id)}
          >
            {nextState.name}
          </Button>
        ))}
      </ButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
`;
