import type { Fsm, StateNode } from '@fsm-challenge/fsm';
import { useMemo, useCallback } from 'react';
import { ActiveState } from '../types/active-state';

import {
  type Node as FlowChartNode,
  type Edge as FlowChartEdge,
  MarkerType,
} from '@xyflow/react';

export interface FlowChartSchema {
  nodes: FlowChartNode[];
  edges: FlowChartEdge[];
}

export function useGetFlowChartSchemaFromFsm<T>(fsm: Fsm<T>): FlowChartSchema {
  const nodeSize = 100;

  const getFlowChartNode = useCallback(
    (stateNode: StateNode<T>, idx: number): FlowChartNode => {
      return {
        id: stateNode.id,
        position: { x: 0, y: idx * nodeSize * 2 },
        measured: { width: nodeSize, height: nodeSize },
        type: 'customNode',
        data: {
          id: stateNode.id,
          label: stateNode.name,
        },
      };
    },
    []
  );

  const getEdgesFromStateNode = useCallback(
    (stateNode: StateNode<T>): FlowChartEdge[] => {
      if (!stateNode.nextStateIds) {
        return [];
      }
      return stateNode.nextStateIds.map((nextStateId) => ({
        id: `${stateNode.id} - ${nextStateId}`,
        target: nextStateId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        source: stateNode.id,
      }));
    },
    []
  );

  return useMemo(() => {
    const nodes: FlowChartNode[] = [];
    const edges: FlowChartEdge[] = [];

    const stateNodes = fsm.getStateNodes();
    stateNodes.forEach((node, idx) => {
      nodes.push(getFlowChartNode(node, idx));
      edges.push(...getEdgesFromStateNode(node));
    });

    return { nodes, edges };
  }, [fsm, getEdgesFromStateNode, getFlowChartNode]);
}
