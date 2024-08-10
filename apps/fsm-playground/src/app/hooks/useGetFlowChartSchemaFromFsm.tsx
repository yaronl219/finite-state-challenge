import type { Fsm, StateNode } from '@fsm-challenge/fsm';
import { useMemo, useCallback, useEffect } from 'react';

import {
  type Node as FlowChartNode,
  type Edge as FlowChartEdge,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { nodeSize } from '../consts/node-size';
import { isEqual } from 'lodash';

export interface FlowChartSchema {
  nodes: FlowChartNode[];
  edges: FlowChartEdge[];
}

const getFlowChartNode = (
  stateNode: StateNode<any>,
  idx: number,
  previousState?: FlowChartNode
): FlowChartNode => {
  return {
    id: stateNode.id,
    position: previousState?.position ?? { x: 0, y: idx * nodeSize * 2 },
    measured: { width: nodeSize, height: nodeSize },
    type: 'customNode',
    data: {
      id: stateNode.id,
      label: stateNode.name,
    },
  };
};

const getEdgesFromStateNode = (stateNode: StateNode<any>): FlowChartEdge[] => {
  if (!stateNode.nextStateIds) {
    return [];
  }

  return stateNode.nextStateIds.map((nextStateId) => ({
    id: `${stateNode.id} - ${nextStateId.id}`,
    target: nextStateId.id,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    type: 'buttonEdge',
    source: stateNode.id,
    data: {
        action: nextStateId.action
    }
  }));
};

export function useGetFlowChartSchemaFromFsm<T>(fsm: Fsm<T>) {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowChartNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowChartEdge>([]);

  useEffect(() => {
    const newNodes: FlowChartNode[] = [];
    const newEdges: FlowChartEdge[] = [];

    const stateNodes = fsm.getStateNodes();
    stateNodes.forEach((node, idx) => {
      newNodes.push(getFlowChartNode(node, idx, nodes[idx]));
      newEdges.push(...getEdgesFromStateNode(node));
    });

    if (isEqual(newNodes, nodes) && isEqual(newEdges, edges)) {
        return
    }

    setNodes(newNodes);
    setEdges(newEdges)
  }, [edges, fsm, nodes, setEdges, setNodes]);

  return {
    setEdges,
    setNodes,
    nodes,
    edges,
    onEdgesChange,
    onNodesChange
  };

}
