import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { useStateMachineContext } from '../../context/active-state-context/StateMachineContext';
import { StateNodeContainerInGraph } from '../state-node/StateNodeContainerInGraph';

interface CustomNodeProps {
  data: { label: string, id: string, onRenameNode: (newNodeName: string) => void };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const {activeState, onSetActiveStateById, onRenameNode, onRemoveNode} = useStateMachineContext();
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <StateNodeContainerInGraph onRemoveNode={() => onRemoveNode(data.id)} onSetNodeActive={() => onSetActiveStateById(data.id)} title={data.label} isActive={data.id === activeState?.id} onRenameNode={(newNodeName) => onRenameNode(data.id, newNodeName)} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
      />
    </>
  );
};
