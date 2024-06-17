import axios from 'axios';
import { Node, Edge } from 'reactflow';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001', {
  withCredentials: true,
});

export const saveFlow = async (nodes: Node[], edges: Edge[], treeID: string): Promise<void> => {
  try {
    await axios.post('http://localhost:5001/api/save', { nodes, edges, treeID }, { withCredentials: true });
    console.log('Flow saved successfully');
  } catch (error) {
    console.error('Error saving flow:', error);
  }
};

export const loadFlow = async (treeID: string): Promise<{ nodes: Node[], edges: Edge[] }> => {
  try {
    const response = await axios.get(`http://localhost:5001/api/load/${treeID}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error loading flow:', error);
    throw error;
  }
};

export const listTrees = async (): Promise<{ treeID: string, treeName: string }[]> => {
  try {
    const response = await axios.get('http://localhost:5001/api/trees', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error listing trees:', error);
    throw error;
  }
};

export const createNewTree = async (treeName: string): Promise<{ treeID: string, treeName: string }> => {
  try {
    const response = await axios.post('http://localhost:5001/api/trees', { treeName }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creating new tree:', error);
    throw error;
  }
};

export const startExecution = (treeID: string): void => {
  socket.emit('start-execution', treeID);
};

socket.on('node-status', (data) => {
  console.log(`Node ${data.nodeId} status: ${data.status}`);
});
