import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const ParallelNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div style={{ 
      padding: 10, 
      borderRadius: '5px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E7E7E7',
      boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px',
    }}>
      {data.icon ? (
          <data.icon style={{ width: '70%', height: '70%' }} />
      ) : (

    <span>{data.label}</span>
      )}
    <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
    <Handle type="source" position={Position.Bottom} id="b" style={{ background: '#555' }} />
  </div>
);
};

export default ParallelNode;