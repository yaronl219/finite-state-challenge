import React, { useCallback, useState } from 'react';
import { SavedStateMacineMinified } from '../../types/saved-state-machine-minified';

import {
    CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  styled,
} from '@mui/material';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';

interface SavedStateMachinesListProps {
  stateMachines: SavedStateMacineMinified[];
  isLoading: boolean;
}

export const SavedStateMachinesList: React.FC<SavedStateMachinesListProps> = ({
  stateMachines,
  isLoading,
}) => {
  const { fetchAndSetSavedStateMachine } = useStateMachineContext();
  const [loadingNewStateMachineId, setLoadingNewStateMachineId] = useState<string>('')

  const onSelectNewStateMachine = useCallback(async(id: string) => {
    setLoadingNewStateMachineId(id)
    await fetchAndSetSavedStateMachine(id)
    setLoadingNewStateMachineId('')
  }, [fetchAndSetSavedStateMachine])

  return (
    <List>
      {isLoading
        ? new Array(10).fill(null).map((_, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton>
                <StyledSkeleton variant="text" />
              </ListItemButton>
            </ListItem>
          ))
        : stateMachines.map(({ id, name }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={() => onSelectNewStateMachine(id)}>
                <ListItemText primary={name} />
                {loadingNewStateMachineId === id ? <CircularProgress size="1rem" /> : null}
              </ListItemButton>
            </ListItem>
          ))}
    </List>
  );
};

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 2rem;
`;
