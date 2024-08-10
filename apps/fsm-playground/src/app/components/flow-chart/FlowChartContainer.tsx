import { ReactFlow, useNodesState, useEdgesState, Edge } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CustomNode } from './CustomNode';
import { Fsm } from '@fsm-challenge/fsm';
import { useGetFlowChartSchemaFromFsm } from '../../hooks/useGetFlowChartSchemaFromFsm';

import { CustomEdge } from './ButtonEdge';
import styled from 'styled-components';
import { useAutoLayoutNodes } from '../../hooks/useAutoLayoutNodes';
import { PrimaryIconButton } from '../design-components/PrimaryIconButton';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';

const customNodes = {
  customNode: CustomNode,
};

interface LayoutFlowProps {
  fsm: Fsm<any>;
  onConnectEdge: (sourceId: string, targetId: string) => void;
}

export const LayoutFlow: React.FC<LayoutFlowProps> = ({
  fsm,
  onConnectEdge,
}) => {
  const {onCreateNode} = useStateMachineContext()

  const { nodes, edges, onEdgesChange, onNodesChange, setEdges, setNodes } =
    useGetFlowChartSchemaFromFsm(fsm);

  const { layoutNodes } = useAutoLayoutNodes(setNodes, setEdges);
  return (
    <StyledContainer>
      <FloatingButtonsContainer>
        <PrimaryIconButton onClick={onCreateNode}>
          <Tooltip placement='left' title="Create a new node">
            <AddOutlined />
          </Tooltip>
        </PrimaryIconButton>
        <PrimaryIconButton onClick={() => layoutNodes(nodes, edges)}>
          <Tooltip placement='left' title="Relayout the nodes">
            <CategoryOutlined />
          </Tooltip>
        </PrimaryIconButton>
      </FloatingButtonsContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={{ buttonEdge: CustomEdge }}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={({ source, target }) => onConnectEdge(source, target)}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FloatingButtonsContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
`;
