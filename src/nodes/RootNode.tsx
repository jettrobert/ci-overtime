import React, { useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import RootNodeModal from './RootNodeModal';
import { IconType } from "react-icons";
import { PiStarFill, PiClock } from 'react-icons/pi';

const iconMap: { [key: string]: IconType } = {
  Internal: PiClock,
  Webhook: PiStarFill,
};

const RootNode: React.FC<NodeProps> = ({ id, data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 70, y: 0 });
  const { project, setNodes } = useReactFlow();
  const IconComponent = iconMap[data.icon] || null;

  const handleNodeClick = (event: React.MouseEvent) => {
    setModalOpen(true);
  };

  const handleModalSave = (newData: { label: string; icon: string; type: string }) => {
    data.label = newData.label;
    data.icon = newData.icon;
    data.type = newData.type;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  };

  return (
    <>
      <div
        onClick={handleNodeClick}
        style={{
          padding: 10,
          border: '1px solid #666666',
          background: 'white',
          borderRadius: '5px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          font: '10px',
          position: 'relative',
          boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px',
        }}
      >
        {IconComponent ? <IconComponent style={{ width: '70%', height: '70%' }} /> : <span>{data.label}</span>}
        <Handle type="source" position={Position.Bottom} id="a" style={{ background: '#555' }} />
        {data.type && (
          <div style={{ position: 'absolute', top: '50%', left: '100%', marginLeft: 10, transform: 'translate(0, -50%)', background: 'darkgray', padding: '5px', borderRadius: '5px', whiteSpace: 'nowrap', fontSize: '8px', color: 'black' }}>
            Type: {data.type}
            <div></div>
          </div>
        )}
      </div>
      <RootNodeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        position={modalPosition}
      />
    </>
  );
};

export default RootNode;
