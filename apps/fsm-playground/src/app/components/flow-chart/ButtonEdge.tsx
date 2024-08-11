import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  ReactFlowState,
  getBezierPath,
  useStore,
} from '@xyflow/react';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { TextField, Tooltip } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { PrimaryIconButton } from '../design-components/PrimaryIconButton';

// import './buttonedge.css';
export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${
    centerX + +offset
  } ${centerY} ${targetX} ${targetY}`;
};

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
  data,
}: EdgeProps) {
  const { onDeleteConnection, onRenameAction } = useStateMachineContext();

  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target)
    );

    return edgeExists;
  });

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const onEdgeClick = useCallback(() => {
    onDeleteConnection(source, target);
  }, [onDeleteConnection, source, target]);

  const onRenameEdge = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onRenameAction(source, target, ev.target.value);
    },
    [onRenameAction, source, target]
  );

  const centerY = (sourceY + targetY) / 2;
  const centerX = (sourceX + targetX) / 2;

  let path = '';

  const offset = sourceX < targetX ? 300 : -300;
  if (isBiDirectionEdge) {
    path = getSpecialPath(edgePathParams, offset);
  } else {
    [path] = getBezierPath(edgePathParams);
  }

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${
              centerX + offset / 2
            }px,${centerY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <EdgeNameContainer>
            <StyledTextFieldContainer>
              <TextField value={data?.action} onChange={onRenameEdge} />
            </StyledTextFieldContainer>
            <PrimaryIconButton onClick={onEdgeClick}>
              <Tooltip title="remove connection">
                <DeleteOutlineOutlined />
              </Tooltip>
            </PrimaryIconButton>
          </EdgeNameContainer>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const EdgeNameContainer = styled.div`
  display: flex;
`;

const StyledTextFieldContainer = styled.div`
  background-color: #ffffff;
`;
