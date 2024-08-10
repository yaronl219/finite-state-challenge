import React from 'react';
import { LayoutFlow } from '../flow-chart/FlowChartContainer';
import { ReactFlowProvider } from '@xyflow/react';
import styled from 'styled-components';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';


export const RightPane: React.FC = () => {
    const {onConnectSteps, fsm} = useStateMachineContext()
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
