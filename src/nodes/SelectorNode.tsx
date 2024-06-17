import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FaArrowRightLong } from 'react-icons/fa6';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Failed':
      return 'red';
    case 'Running':
      return 'yellow';
    case 'Success':
      return 'green';
    case 'Not-yet-triggered':
    default:
      return 'gray';
  }
};

const SelectorNode: React.FC<NodeProps> = ({ data }) => {
  const statusColor = getStatusColor(data.status);

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
      position: 'relative'
    }}>
      <FaArrowRightLong style={{ width: '70%', height: '70%' }} />
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="b" style={{ background: '#555' }} />
      <div style={{
        position: 'absolute',
        top: '6px',
        right: '6px',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: statusColor,
      }} />
      <div style={{
        position: 'absolute',
        top: '3px',
        left: '3px',
        fontSize: '10px',
        color: 'gray'
      }}>
        {data.nodeOrderNumber}
      </div>
    </div>
  );
};

export default SelectorNode;
