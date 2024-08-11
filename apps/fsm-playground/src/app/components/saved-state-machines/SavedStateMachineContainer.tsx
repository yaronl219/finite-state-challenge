import { CheckOutlined } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { useSearchStateMachines } from '../../hooks/useSearchStateMachines';
import { SavedStateMachinesList } from './SavedStateMachinesList';

export const SavedStateMachineContainer = () => {
  const [searchString, setSearchString] = useState('');

  const { stateMachines, isLoading } = useSearchStateMachines(searchString);

  return (
    <StyledPaper square>
      <TopSection>
        <Typography variant="h5">Saved state machines</Typography>
        <TextField
          fullWidth
          placeholder="Search for saved machines"
          value={searchString}
          onChange={(ev) => setSearchString(ev.target.value)}
        />
      </TopSection>
      <SavedStateMachinesList
        stateMachines={stateMachines}
        isLoading={isLoading}
      />
    </StyledPaper>
  );
};

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 0 1rem;
  align-items: center;
`;
const StyledPaper = styled(Paper)`
  height: 100%;
`;
