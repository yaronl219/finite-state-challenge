import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { ActiveState } from '../../types/active-state';
import { StateNode } from '@fsm-challenge/fsm';

interface NextStateButtonProps {
  activeState: ActiveState<any>;
  nextState: StateNode<any>;
  onAdvanceStep: (id: string) => void;
}

export const NextStateButton: React.FC<NextStateButtonProps> = ({
  activeState,
  nextState,
  onAdvanceStep,
}) => {
  const nextStateText = useMemo(() => {
    const nextStateAction = activeState.nextStateIds?.find(
      ({ id }) => nextState.id === id
    )?.action;
    
    return nextStateAction ?? `Adavnce state to "${nextState.name}"`;
  }, [activeState.nextStateIds, nextState.id, nextState.name]);

  return (
    <Button
      variant="contained"
      onClick={() => onAdvanceStep(nextState.id)}
    >
      {nextStateText}
    </Button>
  );
};
