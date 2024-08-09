import { TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface StateNodeProps {
  title: string;
  isActive: boolean;
  onRenameNode: (newNodeName: string) => void
}

export const StateNodeContainer: React.FC<StateNodeProps> = ({ title, isActive, onRenameNode }) => {
  return <StyledNode isActive={isActive}><TextField value={title} onChange={(ev) => onRenameNode(ev.target.value)}/></StyledNode>;
};

const StyledNode = styled.div<{isActive: boolean}>`
    border-radius: 50%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background-color: ${({isActive}) => isActive ? 'yellow': 'white'}
`