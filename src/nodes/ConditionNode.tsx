import React, { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FaAsterisk } from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";
import { PiTextAaBold } from "react-icons/pi";
import { IoTime } from "react-icons/io5";
import { MdOutlineDataArray } from "react-icons/md";

const ConditionNode: React.FC<NodeProps> = ({ data }) => {
  useEffect(() => {
    console.log("ConditionNode data:", data);
  }, [data]);

  const conditionIcons: { [key: string]: React.ComponentType } = {
    'Basic Operators': FaAsterisk,
    'Numeric Operators': TbNumbers,
    'Text Operators': PiTextAaBold,
    'Time Operators': IoTime,
    'Array Operators': MdOutlineDataArray
  };

  const ConditionIcon = conditionIcons[data.conditionCategory] || FaAsterisk;

  const nodeIdWithoutTreeName = data.label.replace(/tree-\w+-/, '').toLowerCase();

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
      borderRadius: '15px',
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
      <div>
      </div>
      <div style={{ fontSize: '6px', textAlign: 'center' }}>
        <div style={{ fontSize: '8px' }}><strong>{data.conditionIf}</strong></div>
        <div style={{ 
          fontSize: '7px',
          background: '#dcdcdc',
          color: '#FF5F1F', 
          borderRadius: '2px',
          marginTop: '5px',
          marginBottom: '5px',
          padding: '4px 6px',
          boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1px'
        }}>
            <strong>{data.conditionOperator}</strong></div>
        <div style={{ fontSize: '15px' }}><strong>{data.conditionCondition}</strong></div>
      </div>
      <div style={{ position: 'absolute', top: '105px', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: 'black', marginRight: '3px', fontSize: '7px' }}>Condition</strong>
        <strong style={{
          borderRadius: '3px',
          backgroundColor: '#FF5F1F',
          padding: '2px 6px',
          color: 'white',
          fontSize: '7px',
          boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1px'
        }}>
          {data.conditionCategory.replace(' Operators', '')}
        </strong>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '5px',
        left: '16px',
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

export default ConditionNode;


