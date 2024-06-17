import React, { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FiEye, FiPlusCircle, FiXCircle, FiRefreshCw, FiEdit3 } from "react-icons/fi";

const ActionNode: React.FC<NodeProps> = ({ data }) => {
  useEffect(() => {
    console.log("ActionNode data:", data);
  }, [data]);

  const actionIcons: { [key: string]: React.ComponentType } = {
    CREATE: FiPlusCircle,
    READ: FiEye,
    UPDATE: FiRefreshCw,
    DELETE: FiXCircle,
    GET: FiEye,
    POST: FiPlusCircle,
    PUT: FiRefreshCw,
    PATCH: FiEdit3,
  };

  // Get the icon for the current actionOperation, or use a default icon
  const ActionIcon = actionIcons[data.actionOperation] || FiPlusCircle;

  // Extract the ID name without the tree name and convert it to lowercase
  const nodeIdWithoutTreeName = data.label.replace(/tree-\w+-/, '').toLowerCase();

  // Get the status color
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

  const statusColor = getStatusColor(data.status);

  return (
    <div style={{
      position: 'relative',
      borderRadius: '0px',
      width: '100px',
      height: '100px', // Adjusted height to accommodate the new elements
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E7E7E7',
      boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1px'
    }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ position: 'absolute', fontSize: '10px', top: '5px', left: '5px', display: 'flex' }}>
        <ActionIcon />
      </div>
      <div style={{ 
        backgroundColor: '#dcdcdc',
        borderRadius: '4px', 
        width: '70%', 
        height: '60%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '3px', 
        boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1px' }}>
      <strong style={{ fontSize: '6px' }}>
        {data.actionDescription}
      </strong>
      </div>
      <div style={{ position: 'absolute', top: '105px', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: 'black', marginRight: '3px', fontSize: '7px' }}>Action</strong>
        <strong style={{
          borderRadius: '3px',
          backgroundColor: '#FF5F1F',
          padding: '2px 6px',
          color: 'white',
          fontSize: '7px',
          boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1px'
        }}>
          {data.actionOperation}
        </strong>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '5px',
        left: '22px',
        fontSize: '10px',
        color: 'gray'
      }}>
        <div style={{ fontSize: '8px', display: 'flex' }}>
        <strong>id:</strong> {nodeIdWithoutTreeName}
        </div>
      </div>
      <div style={{
        position: 'absolute',
        top: '3px',
        right: '3px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: statusColor,
        marginTop: '3px',
        marginRight: '3px'
      }} />
    </div>
  );
};

export default ActionNode;
