import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import Modal from '../src/assets/Modal';

import './index.css';

const initialNodes = [];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // State for button visibility
  const [newNodePosition, setNewNodePosition] = useState({ x: 250, y: 5 }); // Default position for the initial node

  const onConnect = useCallback(
    (params) => {
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        setNewNodePosition(screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }));
        setIsModalOpen(true);
      }
    },
    [screenToFlowPosition]
  );

  const handleOptionSelect = ({ icon, label, method, option }) => {
    const id = getId();
    const optionClass = `${option.replace(' ', '-').toLowerCase()}-node`;
    const newNode = {
      id,
      position: newNodePosition,
      data: { label: <div><img src={icon} alt={option} className='node-icon' /> {label}</div> },
      sourcePosition: 'right',
      targetPosition: 'left',
      className: optionClass,
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      eds.concat({
        id,
        source: connectingNodeId.current,
        target: id,
        animated: method === 'Script' || method === 'AI',
      })
    );
    setIsModalOpen(false);
    setIsButtonVisible(false); // Hide button after selection
  };

  const createInitialNode = () => {
    const id = getId();
    const initialNode = {
      id,
      position: { x: 250, y: 5 },
      data: { label: 'Start Workflow' },
      sourcePosition: 'right',
      targetPosition: 'left',
      className: 'start-workflow-node',
    };

    setNodes([initialNode]);
    setIsModalOpen(true);
    setIsButtonVisible(false);
  };

  const backgroundStyles = {
    background: '#1D4646',
    zIndex: -1,
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      />
      <Background color='#000000' variant='dots' style={backgroundStyles} />
      <Controls />
      {isButtonVisible && ( // Conditional rendering of the button
        <div className="start-workflow-container">
          <div className="start-workflow-text">Start Workflow</div>
          <button
            className="start-workflow-button"
            onClick={createInitialNode}
          >
            +
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);