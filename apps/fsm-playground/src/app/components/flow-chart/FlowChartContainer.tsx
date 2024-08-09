import { ReactFlow, useNodesState, useEdgesState, Edge } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CustomNode } from './CustomNode';
import { Fsm } from '@fsm-challenge/fsm';
import { useGetFlowChartSchemaFromFsm } from '../../hooks/useGetFlowChartSchemaFromFsm';
import { useAutoLayoutNodes } from '../../hooks/useAutoLayoutNodes';
import { useEffect } from 'react';

const customNodes = {
  customNode: CustomNode,
};

interface LayoutFlowProps {
  fsm: Fsm<any>;
  onConnectEdge: (sourceId: string, targetId: string) => void;
  onRemoveConnection: (sourceId: string, targetId: string) => void;
}

export const LayoutFlow: React.FC<LayoutFlowProps> = ({
  fsm,
  onConnectEdge,
  onRemoveConnection
}) => {
  const { nodes: initialNodes, edges: initialEdges } =
    useGetFlowChartSchemaFromFsm(fsm);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const { layoutNodes } = useAutoLayoutNodes(
    initialNodes,
    initialEdges,
    setNodes,
    setEdges
  );

  const onEdgesDelete = (edges: Edge[]) => {
    edges.forEach(({source, target}) => onRemoveConnection(source, target))
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={({ source, target }) => onConnectEdge(source, target)}
        onEdgesDelete={onEdgesDelete}
        fitView
      />
    </div>
  );
};
