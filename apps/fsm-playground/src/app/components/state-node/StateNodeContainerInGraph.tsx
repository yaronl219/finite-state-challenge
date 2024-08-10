import React, { useState } from 'react';
import { StateNodeContainer } from './StateNodeContainer';
import styled from 'styled-components';
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, CheckOutlined, EditOutlined } from '@mui/icons-material';
import { PrimaryIconButton } from '../design-components/PrimaryIconButton';

interface StateNodeContainerInGraphProps {
  title: string;
  isActive: boolean;
  onRenameNode: (newNodeName: string) => void;
  onSetNodeActive: () => void;
  onRemoveNode: () => void;
}

export const StateNodeContainerInGraph: React.FC<
  StateNodeContainerInGraphProps
> = (props) => {
  const [isInHover, setIsInHover] = useState<boolean>(false);

  const [canRenameNode, setCanRenameNode] = useState<boolean>(false);

  return (
    <ClickAwayListener onClickAway={() => setCanRenameNode(false)}>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsInHover(true)}
        onMouseLeave={() => setIsInHover(false)}
      >
        <StateNodeContainer {...props} canRenameNode={canRenameNode} />
        {isInHover && (
          <HoveringIconContainer>
            <Tooltip placement='right' title={`Set ${props.title} as active state`}>
              <PrimaryIconButton size='small' onClick={props.onSetNodeActive}>
                <CheckOutlined fontSize='small' />
              </PrimaryIconButton>
            </Tooltip>
            <Tooltip placement='right' title={`Remove ${props.title}`}>
              <PrimaryIconButton size='small' onClick={props.onRemoveNode}>
                <DeleteOutline fontSize='small' />
              </PrimaryIconButton>
            </Tooltip>
            <Tooltip placement='right' title={`Rename ${props.title}`}>
              <PrimaryIconButton size='small' onClick={() => setCanRenameNode(true)}>
                <EditOutlined fontSize='small' />
              </PrimaryIconButton>
            </Tooltip>
          </HoveringIconContainer>
        )}
      </div>
    </ClickAwayListener>
  );
};

const HoveringIconContainer = styled.div`
  position: absolute;
  left: 100%;
  top: -50%;
`;
