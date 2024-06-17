import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Node,
  Edge,
  Controls,
  Background,
  addEdge,
  Connection,
  EdgeProps,
  BackgroundVariant,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import 'rsuite/dist/rsuite.min.css';
import ButtonEdge from './ButtonEdge';
import { io } from 'socket.io-client';

import FrameNode from './nodes/FrameNode';
import RootNode from './nodes/RootNode';
import SequenceNode from './nodes/SequenceNode';
import SelectorNode from './nodes/SelectorNode';
import ParallelNode from './nodes/ParallelNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';

import SidebarDrawer from './SidebarDrawer';
import SimModule from './sim/sim-module';

import { createNodesAndEdges, recalculateNodeOrderAndLayout, NodeType, nodeCount } from './nodeUtils';

import { saveFlow, loadFlow, startExecution, listTrees, createNewTree } from './api';

// End of imports

// ReactFlow Styles
const rfStyle = {
  backgroundColor: '#E0E0E0',
};

// Different Types of Edges
const edgeTypes = {
  buttonedge: ButtonEdge as React.ComponentType<EdgeProps>,
};

//Different Types of Nodes 
const nodeTypes = {
  frameNode: FrameNode,
  rootNode: RootNode,
  selectorNode: SelectorNode,
  sequenceNode: SequenceNode,
  parallelNode: ParallelNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
};

//Server Connection
const socket = io('http://localhost:5001');

//App details 
const App: React.FC = () => {
  // Imports for the layout
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null);
  const [numChildren, setNumChildren] = useState<number>(0);

  // Imports for the buttons 
  const [showSave, setShowSave] = useState(false);
  const [showLoadStart, setShowLoadStart] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [trees, setTrees] = useState<{ treeID: string, treeName: string }[]>([]);
  const [currentTreeID, setCurrentTreeID] = useState<string | null>(null);
  const [newTreeName, setNewTreeName] = useState<string>('');
  const [showCreateTree, setShowCreateTree] = useState<boolean>(false);
  const [showTreeList, setShowTreeList] = useState<boolean>(false);
  const [showSimModule, setShowSimModule] = useState<boolean>(false);

  // Handle new edge creation. 
  const onConnect: OnConnect = useCallback(
    (params: Edge | Connection) => {
      if (params.source && params.target) {
        const newEdge: Edge = {
          id: `${params.source}-${params.target}`,
          source: params.source,
          target: params.target,
          sourceHandle: params.sourceHandle,
          targetHandle: params.targetHandle,
        };
  
        console.log("New edge created:", newEdge);
  
        // Add the new edge to the edges array
        setEdges((eds) => {
          const updatedEdges = [...eds, newEdge];
          const updatedNodes = nodes.map(node => {
            if (node.id === params.source || node.id === params.target) {
              return { ...node };
            }
            return node;
          });
  
          // Ensure the nodes state includes the newly connected nodes
          setNodes(updatedNodes);
  
          // Recalculate layout with the updated nodes and edges
          recalculateNodeOrderAndLayout(updatedNodes, updatedEdges, setNodes, setEdges, true);
          console.log("Repositioning nodes due to new edge creation");
  
          return updatedEdges;
        });
      }
    },
    [nodes, setNodes, setEdges]
  );  

  // Recalculate the layout. 
  const onNodeDrag = useCallback(
    (_: any, node: Node) => {
      const updatedNodes = nodes.map(n => n.id === node.id ? {...n, position: node.position} : n);

      const parentEdge = edges.find(edge => edge.target === node.id);
      if (parentEdge) {
        const siblingNodes = updatedNodes
          .filter(n => edges.some(edge => edge.source === parentEdge.source && edge.target === n.id))
          .concat(node);

        // Sort nodes based on x position
        siblingNodes.sort((a, b) => a.position.x - b.position.x);

        // Update nodeOrderNumber for all nodes based on their new positions
        siblingNodes.forEach((siblingNode, index) => {
          siblingNode.data.nodeOrderNumber = index;
        });

        setNodes([...updatedNodes]);
      }
    },
    [nodes, edges, setNodes]
  );

  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
      const updatedNodes = nodes.map(n => n.id === node.id ? {...n, position: node.position} : n);

      // Trigger layout recalculation here based on the final node order
      recalculateNodeOrderAndLayout(updatedNodes, edges, setNodes, setEdges, true);
      console.log("Drag stopped, layout recalculated based on node order");
    },
    [nodes, edges, setNodes, setEdges]
  );

  // Save node and edge data to the backend 
  const handleSave = async (
    nodeType: string,
    numChildren: number,
    additionalData?: { nodeName?: string; actionOperation?: string; actionClass?: string; actionDescription?: string; conditionIf?: string; conditionOperator?: string; conditionCategory?: string; conditionCondition?: string }
  ) => {
    console.log('handleSave called');
    console.log(`Node type: ${nodeType}, Number of children: ${numChildren}`);

    setSelectedNodeType(nodeType);
    setNumChildren(numChildren);
    setDrawerOpen(false);

    if (!currentTreeID) {
      console.error('Tree ID is not set.');
      return;
    }

    await createNodesAndEdges(
      nodeType as NodeType,
      nodes,
      edges,
      setNodes,
      setEdges,
      currentTreeID,
      additionalData
    );
  };

  // Save entire tree to the backend 
  const handleFlowSave = async () => {
    if (currentTreeID) {
      try {
        await saveFlow(nodes, edges, currentTreeID);
        console.log('Flow saved successfully');
        setShowSave(false);
        setShowEdit(true);
      } catch (error) {
        console.error('Error saving flow:', error);
      }
    } else {
      setShowCreateTree(true);
    }
  };

  // Create new tree
  const handleCreateTree = async () => {
    if (newTreeName) {
      try {
        const { treeID } = await createNewTree(newTreeName);
        setCurrentTreeID(treeID);
        const initialNodes: Node[] = [
          {
            id: `${treeID}-node-1`,
            data: { label: 'Set Trigger', status: 'Not-yet-triggered' },
            position: { x: 0, y: 0 },
            type: 'rootNode',
            draggable: false,
          }
        ];

        setNodes(initialNodes);
        setEdges([]);
        setShowSave(true);
        setShowLoadStart(true);
        setShowCreateTree(false);
      } catch (error) {
        console.error('Error creating new tree:', error);
      }
    }
  };

  // Load a tree from the backend 
  const handleFlowLoad = async (treeID: string) => {
    try {
      const { nodes, edges } = await loadFlow(treeID);
      setNodes(nodes);
      setEdges(edges);
      setCurrentTreeID(treeID);
      setShowSave(true);
      setShowLoadStart(true);
      setShowTreeList(false);
    } catch (error) {
      console.error('Error loading flow:', error);
    }
  };

  // What happens when the "New Flow" button is clicked. 
  const handleNewFlow = async () => {
    setCurrentTreeID(null);
    setNodes([]);
    setEdges([]);
    setShowSave(false);
    setShowLoadStart(false);
    setShowTreeList(false);
    setShowCreateTree(true);
  };

  // Imports a tree from the saved file. 
  const fetchTrees = async () => {
    try {
      const treesList = await listTrees();
      setTrees(treesList);
      setShowTreeList(true);
    } catch (error) {
      console.error('Error fetching trees:', error);
    }
  };

  // Runs Simulation 
  const handleStartExecution = () => {
    setShowSimModule(true);
  };

  // MAKE THIS REMOVE THE "ADD NODES BUTTON"
  const handleEdit = () => {
    setShowEdit(false);
    setShowSave(true);
  };

  // CLOSES THE SIM
  const handleCloseSimModule = () => {
    setShowSimModule(false);
  };

  // STARTS THE SIMULATION 
  const handleStartSimulation = () => {
    if (currentTreeID) {
      startExecution(currentTreeID);
    } else {
      console.error('No treeID set for execution.');
    }
  };

  // FIGURE THIS OUT 
  const handleResetNodes = () => {
    // Implement reset nodes functionality here
  };

  // HANDLES THE NODE STATUS 
  const updateNodeStatus = (nodeId: string, status: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, status } } : node
      )
    );
  };

  return (
    <ReactFlowProvider>
      <div className='app-container'>
        {showTreeList && (
          <div className='tree-list'>
            <ul>
              {trees.map(tree => (
                <li key={tree.treeID} onClick={() => handleFlowLoad(tree.treeID)}>
                  {tree.treeName}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='flow-container'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            snapToGrid={true}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
          >
            <Background color='#FF8330' variant={BackgroundVariant.Dots} />
            <Controls />
          </ReactFlow>
          <SidebarDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            nodes={nodes}
            setNodes={setNodes}
            onSave={handleSave}
          />
          <div className='floating-buttons'>
            {!currentTreeID && !showCreateTree && (
              <>
                <button className="floating-button-item" onClick={handleNewFlow}>New Tree</button>
                <button className="floating-button-item" onClick={fetchTrees}>Load Tree</button>
                <button className="floating-button-item" onClick={() => setDrawerOpen(true)}>Add Nodes</button>
              </>
            )}
            {showCreateTree && (
              <div>
                <input
                  type="text"
                  value={newTreeName}
                  onChange={(e) => setNewTreeName(e.target.value)}
                  placeholder="Enter tree name"
                  className="tree-name-input"
                />
                <button className="floating-button-item" onClick={handleCreateTree}>Create Tree</button>
              </div>
            )}
            {showSave && (
              <>
                <button className="floating-button-item" onClick={handleFlowSave}>Save Tree</button>
                <button className="floating-button-item" onClick={handleNewFlow}>New Tree</button>
                <button className="floating-button-item" onClick={fetchTrees}>Load Tree</button>
                <button className="floating-button-item" onClick={handleStartExecution}>Run Simulation</button>
                <button className="floating-button-item" onClick={() => setDrawerOpen(true)}>Add Nodes</button>
              </>
            )}
            {showEdit && (
              <>
                <button className="floating-button-item" onClick={handleEdit}>Edit Tree</button>
                <button className="floating-button-item" onClick={handleNewFlow}>New Tree</button>
                <button className="floating-button-item" onClick={fetchTrees}>Load Tree</button>
                <button className="floating-button-item" onClick={handleStartExecution}>Run Simulation</button>
                <button className="floating-button-item" onClick={() => setDrawerOpen(true)}>Add Nodes</button>
              </>
            )}
          </div>
        </div>
        {showSimModule && (
          <SimModule
            nodes={nodes}
            onClose={handleCloseSimModule}
            onStartSimulation={handleStartSimulation}
            onResetNodes={handleResetNodes}
            updateNodeStatus={updateNodeStatus}
          />
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default App;
