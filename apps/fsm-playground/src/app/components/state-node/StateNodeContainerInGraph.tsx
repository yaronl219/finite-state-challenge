import React, { useState } from 'react';
import { StateNodeContainer } from './StateNodeContainer';
import styled from 'styled-components';
import { ClickAwayListener, Tooltip } from '@mui/material';
import {
  DeleteOutline,
  CheckOutlined,
  EditOutlined,
} from '@mui/icons-material';
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
            <PrimaryIconButton size="small" onClick={props.onSetNodeActive}>
              <Tooltip
                placement="right"
                title={`Set ${props.title} as active state`}
              >
                <CheckOutlined fontSize="small" />
              </Tooltip>
            </PrimaryIconButton>
            <PrimaryIconButton size="small" onClick={props.onRemoveNode}>
              <Tooltip placement="right" title={`Remove ${props.title}`}>
                <DeleteOutline fontSize="small" />
              </Tooltip>
            </PrimaryIconButton>
            <PrimaryIconButton
              size="small"
              onClick={() => setCanRenameNode(true)}
            >
              <Tooltip placement="right" title={`Rename ${props.title}`}>
                <EditOutlined fontSize="small" />
              </Tooltip>
            </PrimaryIconButton>
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
