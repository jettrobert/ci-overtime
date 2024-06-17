const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');
const Tree = require('../models/Tree');

// Save nodes and edges
router.post('/save', async (req, res) => {
  try {
    const { nodes, edges, treeID } = req.body;
    await Node.deleteMany({ treeID });
    await Edge.deleteMany({ treeID });
    await Node.insertMany(nodes.map(node => ({ ...node, treeID })));
    await Edge.insertMany(edges.map(edge => ({ ...edge, treeID })));
    res.status(200).send('Flow saved successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Load nodes and edges
router.get('/load/:treeID', async (req, res) => {
  try {
    const { treeID } = req.params;
    const nodes = await Node.find({ treeID });
    const edges = await Edge.find({ treeID });
    res.json({ nodes, edges });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// List all trees
router.get('/trees', async (req, res) => {
  try {
    const trees = await Tree.find({});
    res.json(trees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new tree
router.post('/trees', async (req, res) => {
  try {
    const { treeName } = req.body;
    const treeID = `tree-${Math.random().toString(36).substr(2, 9)}`;
    const newTree = new Tree({ treeID, treeName });
    await newTree.save();
    res.json(newTree);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update node status
router.post('/update-status', async (req, res) => {
  try {
    const { nodeId, status } = req.body;
    await Node.updateOne({ id: nodeId }, { status });
    res.status(200).send('Node status updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
