import React from 'react';
import { StateNodeContainer } from '../state-node/StateNodeContainer';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { ActiveState } from '../../types/active-state';

interface StatePlayerProps {
  onRenameNode: (id: string, newNodeName: string) => void;
  onAdvanceStep: (id: string) => void;
  activeState: ActiveState<any>;
}

export const StatePlayer: React.FC<StatePlayerProps> = ({
  activeState,
  onRenameNode,
  onAdvanceStep,
}) => {
  return (
    <StyledStatePlayerContainer>
        <ActiveStateNodeContainer>
      <StateNodeContainer
        title={activeState?.name ?? ''}
        isActive={true}
        canRenameNode={false}
        onRenameNode={(newNodeName) =>
          onRenameNode(activeState?.id, newNodeName)
        }
      />
      </ActiveStateNodeContainer>
      <ButtonContainer>
        {activeState?.nextStates.map((nextState) => (
          <Button
            variant="contained"
            key={nextState.id}
            onClick={() => onAdvanceStep(nextState.id)}
          >
            Adavnce state to "{nextState.name}"
          </Button>
        ))}
      </ButtonContainer>
    </ StyledStatePlayerContainer>
  );
};

const ActiveStateNodeContainer = styled.div`
    display: flex;
    justify-content: center;
`

const StyledStatePlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
