import { Handle, Position, Node } from '@xyflow/react';
import React, { useContext } from 'react';
import { StateNodeContainer } from '../state-node/StateNodeContainer';
import { ActiveStateContext } from '../../context/ActiveStateContext';

interface CustomNodeProps {
  data: { label: string, id: string, onRenameNode: (newNodeName: string) => void };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const activeId = useContext(ActiveStateContext);
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <StateNodeContainer title={data.label} isActive={data.id === activeId} onRenameNode={data.onRenameNode} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        // style={handleStyle}
      />
    </>
  );
};
