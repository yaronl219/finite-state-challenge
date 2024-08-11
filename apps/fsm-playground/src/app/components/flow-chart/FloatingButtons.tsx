import React from 'react';
import styled from 'styled-components';
import { PrimaryIconButton } from '../design-components/PrimaryIconButton';
import { Tooltip } from '@mui/material';
import {
  AddOutlined,
  CategoryOutlined,
  FileOpenOutlined,
  SaveOutlined,
} from '@mui/icons-material';

interface FloatingButtonsProps {
  onCreateNode: () => void;
  layoutNodes: () => void;
  onSaveState: () => void;
  onCreateNew: () => void
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onCreateNode,
  layoutNodes,
  onSaveState,
  onCreateNew
}) => {
  return (
    <FloatingButtonsContainer>
      <PrimaryIconButton onClick={onCreateNew}>
        <Tooltip placement="left" title="Create new state machine">
          <FileOpenOutlined />
        </Tooltip>
      </PrimaryIconButton>
      <PrimaryIconButton onClick={onSaveState}>
        <Tooltip placement="left" title="Save this state machine">
          <SaveOutlined />
        </Tooltip>
      </PrimaryIconButton>
      <PrimaryIconButton onClick={onCreateNode}>
        <Tooltip placement="left" title="Create a new node">
          <AddOutlined />
        </Tooltip>
      </PrimaryIconButton>
      <PrimaryIconButton onClick={layoutNodes}>
        <Tooltip placement="left" title="Relayout the nodes">
          <CategoryOutlined />
        </Tooltip>
      </PrimaryIconButton>
    </FloatingButtonsContainer>
  );
};

const FloatingButtonsContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
`;
