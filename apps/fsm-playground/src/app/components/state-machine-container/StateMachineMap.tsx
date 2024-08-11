import React from 'react';
import { LayoutFlow } from '../flow-chart/FlowChartContainer';
import { ReactFlowProvider } from '@xyflow/react';
import styled from 'styled-components';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { Paper, TextField, Typography } from '@mui/material';

export const StateMachineMap: React.FC = () => {
  const {
    onChangeSavedStateMachineName,
    savedStateMachineName,
  } = useStateMachineContext();

  
  return (
    <StyledRightPane square>
      <Typography variant='h5'>State machine map</Typography>
      <TextField fullWidth placeholder='Name this state machine' value={savedStateMachineName} onChange={ev => onChangeSavedStateMachineName(ev.target.value)} />
      <ReactFlowProvider>
        <LayoutFlow  />
      </ReactFlowProvider>
    </StyledRightPane>
  );
};

const StyledRightPane = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;
