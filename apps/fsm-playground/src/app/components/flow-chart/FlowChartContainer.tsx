import { ReactFlow, useReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CustomNode } from './CustomNode';
import { useGetFlowChartSchemaFromFsm } from '../../hooks/useGetFlowChartSchemaFromFsm';

import { CustomEdge } from './ButtonEdge';
import styled from 'styled-components';
import { useAutoLayoutNodes } from '../../hooks/useAutoLayoutNodes';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { useEffect } from 'react';
import { FloatingButtons } from './FloatingButtons';

const customNodes = {
  customNode: CustomNode,
};

export const LayoutFlow: React.FC = () => {
  const { onConnectSteps, fsm, onCreateNode, onSaveStateMachine, onCreateNew } = useStateMachineContext();

  const { nodes, edges, onEdgesChange, onNodesChange, setEdges, setNodes } =
    useGetFlowChartSchemaFromFsm(fsm);
  const { fitView } = useReactFlow();

  const { layoutNodes } = useAutoLayoutNodes(setNodes, setEdges);

  useEffect(() => {
    fitView({ minZoom: 0.1, duration: 300 });
  }, [fitView, nodes]);

  return (
    <StyledContainer>
      <FloatingButtons
        layoutNodes={() => layoutNodes(nodes, edges)}
        onCreateNode={onCreateNode}
        onCreateNew={onCreateNew}
        onSaveState={onSaveStateMachine}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={{ buttonEdge: CustomEdge }}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={({ source, target }) => onConnectSteps(source, target)}
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
