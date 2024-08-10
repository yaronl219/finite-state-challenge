import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { Button, IconButton } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { PrimaryIconButton } from '../design-components/PrimaryIconButton';

// import './buttonedge.css';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  source,
  target,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { onDeleteConnection } = useStateMachineContext();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = useCallback(() => {
    onDeleteConnection(source, target)
  }, [onDeleteConnection, source, target]);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <PrimaryIconButton onClick={onEdgeClick}>
            <DeleteOutlineOutlined />
          </PrimaryIconButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

