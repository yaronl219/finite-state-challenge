import React from 'react';
import { LayoutFlow } from '../flow-chart/FlowChartContainer';
import { ReactFlowProvider } from '@xyflow/react';
import { Fsm } from '@fsm-challenge/fsm';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';

interface RightPaneProps {

}

export const RightPane: React.FC<RightPaneProps> = ({
}) => {
    const {onConnectSteps, fsm, onCreateNode} = useStateMachineContext()
  return (
    <StyledRightPane>
      <ReactFlowProvider>
        <LayoutFlow
          fsm={fsm}
          onConnectEdge={onConnectSteps}
        />
      </ReactFlowProvider>
    </StyledRightPane>
  );
};

const StyledRightPane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
