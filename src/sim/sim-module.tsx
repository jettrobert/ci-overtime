import React from 'react';
import { Node } from 'reactflow';
import { Toggle } from 'rsuite';
import Draggable from 'react-draggable';
import './sim-module.css';  // Import the CSS file
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface SimModuleProps {
  nodes: Node[];
  onClose: () => void;
  onStartSimulation: () => void;
  onResetNodes: () => void;
  updateNodeStatus: (nodeId: string, status: string) => void;
}

const SimModule: React.FC<SimModuleProps> = ({
  nodes,
  onClose,
  onStartSimulation,
  onResetNodes,
  updateNodeStatus
}) => {
  const handleToggle = (nodeId: string, checked: boolean) => {
    const status = checked ? 'Success' : 'Failure';
    updateNodeStatus(nodeId, status);
  };

  return (
    <Draggable handle=".handle">
      <div className="sim-module">
        <div className="handle sim-module-header">
          <RxDragHandleDots2 className="handle-dots" />
          <button onClick={onClose} className="close-button"><IoClose /></button>
        </div>
        <div className="sim-module-content">
          {nodes
            .filter(node => node.type === 'actionNode' || node.type === 'conditionNode')
            .map(node => (
              <div key={node.id} className="node-control">
                <span className='toggle-title'>{node.data.label}</span>
                <div className="toggle-container">
                  <span className="toggle-text">Failure</span>
                  <Toggle
                    defaultChecked={node.data.status === 'Success'}
                    onChange={checked => handleToggle(node.id, checked)}
                    color="green"
                  />
                  <span className="toggle-text">Success</span>
                </div>
              </div>
            ))}
          <button onClick={onStartSimulation} className="sim-button">Start Simulation</button>
          <button onClick={onResetNodes} className="sim-button">Reset Nodes</button>
        </div>
      </div>
    </Draggable>
  );
};

export default SimModule;
