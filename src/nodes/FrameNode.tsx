import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const DottedNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div style={{ 
      padding: 10, 
      border: '1px dashed #EC5800',
      borderRadius: '5px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      background: '#FFF5EE',
      position: 'relative',
      fontSize: 'xx-small'
    }}>
      {data.icon ? (
        <data.icon style={{ width: '100%', height: '100%' }} />
      ) : (
        <div style={{ fontSize: '8px', color: '#EC5800' }}>Set Child</div>
      )}
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      {data.nodeOrderNumber !== undefined && (
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          fontSize: '10px',
          color: 'gray'
        }}>
          {data.nodeOrderNumber}
        </div>
      )}
    </div>
  );
};

export default DottedNode;
