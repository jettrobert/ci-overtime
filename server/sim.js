const Node = require('./models/Node');
const Edge = require('./models/Edge');

// Helper function to execute child nodes
const executeChildren = async (nodeId, nodes, edges, io, condition) => {
  const childEdges = edges.filter(edge => edge.source === nodeId);
  const childNodes = childEdges.map(edge => nodes.find(node => node.id === edge.target));
  
  for (const childNode of childNodes.sort((a, b) => b.data.nodeOrderNumber - a.data.nodeOrderNumber)) {
    await executeNode(childNode.id, nodes, edges, io);
    if (condition(childNode.status)) {
      return true;
    }
  }
  return false;
};

// Execute a single node based on its type
const executeNode = async (nodeId, nodes, edges, io) => {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return;

  console.log(`Executing node ${node.id}`);
  node.status = 'Running';
  await node.save();
  io.emit('node-status', { nodeId: node.id, status: 'Running' });

  setTimeout(async () => {
    let result = 'Failure';

    switch (node.type) {
      case 'selectorNode':
        const selectorCondition = (status) => status === 'Success';
        if (await executeChildren(nodeId, nodes, edges, io, selectorCondition)) {
          result = 'Success';
        }
        break;
      case 'sequenceNode':
        const sequenceCondition = (status) => status === 'Failure';
        if (!await executeChildren(nodeId, nodes, edges, io, sequenceCondition)) {
          result = 'Success';
        }
        break;
      case 'actionNode':
      case 'conditionNode':
        result = 'Success';
        break;
      default:
        result = 'Success';
    }

    node.status = result;
    await node.save();
    io.emit('node-status', { nodeId: node.id, status: result });

    if (result === 'Success') {
      const childEdges = edges.filter(edge => edge.source === node.id);
      for (const edge of childEdges) {
        await executeNode(edge.target, nodes, edges, io);
      }
    }
  }, 1000);
};

module.exports = { executeNode };
