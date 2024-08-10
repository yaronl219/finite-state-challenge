import { TextField, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { nodeSize } from '../../consts/node-size';

interface StateNodeProps {
  title: string;
  isActive: boolean;
  onRenameNode: (newNodeName: string) => void;
  canRenameNode: boolean;
}

export const StateNodeContainer: React.FC<StateNodeProps> = ({
  title,
  isActive,
  canRenameNode,
  onRenameNode,
}) => {
  return (
    <StyledNode isActive={isActive}>
      {canRenameNode ? <TextField
        value={title}
        variant='standard'
        onChange={(ev) => onRenameNode(ev.target.value)}
      />: <Typography>{title}</Typography> }
      
    </StyledNode>
  );
};

const StyledNode = styled.div<{ isActive: boolean }>`
  border-radius: 0.5rem;
  border: 1px solid black;
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
  height: 3rem;
  width: ${nodeSize}px;
  background-color: ${({ isActive }) => (isActive ? '#91bce6' : '#d6ebff')};
`;
