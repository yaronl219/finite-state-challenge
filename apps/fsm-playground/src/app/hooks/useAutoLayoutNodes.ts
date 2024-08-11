import { Node, Edge, useReactFlow, Rect } from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';
import Dagre from '@dagrejs/dagre';
import { duration } from '@mui/material';

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB' });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export const useAutoLayoutNodes = (
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void
) => {
  const { fitView } = useReactFlow();

//   const zoomToIncludeAllNodes = useCallback((nodes: Node[]) => {
//     let highestNode = -Infinity
//     let lowestNode = Infinity

//     nodes.forEach(node => {
//         if (node.position.y < highestNode) {
//             highestNode = node.position.y
//         }
//         if (node.position.y > lowestNode) {
//             lowestNode = node.position.y
//         }
//     })
//     const bounds: Rect = {
//         height: Math.abs(highestNode) + Math.abs(lowestNode),
//         width: 300,
//         y: highestNode
//     }

//     fitBounds(bounds, { duration: 800 });
//   }, [fitBounds]);

  const layoutNodes = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      const layouted = getLayoutedElements(nodes, edges);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    //   fitView({minZoom: 0.1, duration: 5})
    },
    [setEdges, setNodes, fitView]
  );

  return {
    layoutNodes,
  };
};
