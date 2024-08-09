import React from 'react';
import { LayoutFlow } from '../flow-chart/FlowChartContainer';
import { ReactFlowProvider } from '@xyflow/react';
import { Fsm } from '@fsm-challenge/fsm';
import styled from 'styled-components';
import { Button } from '@mui/material';

interface RightPaneProps {
  fsm: Fsm<any>;
  onConnectEdge: (sourceId: string, targetId: string) => void;
  onRemoveConnection: (sourceId: string, targetId: string) => void;
  onCreateNewNode: () => void
}

export const RightPane: React.FC<RightPaneProps> = ({
  fsm,
  onConnectEdge,
  onRemoveConnection,
  onCreateNewNode
}) => {
  return (
    <StyledRightPane>
        <Button onClick={onCreateNewNode}>Create new state</Button>
      <ReactFlowProvider>
        <LayoutFlow
          fsm={fsm}
          onConnectEdge={onConnectEdge}
          onRemoveConnection={onRemoveConnection}
        />
      </ReactFlowProvider>
    </StyledRightPane>
  );
};

const StyledRightPane = styled.div`
  display: flex;
  flex-direction: column;
`;
