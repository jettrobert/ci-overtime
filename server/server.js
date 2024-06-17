const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Node = require('./models/Node');
const Edge = require('./models/Edge');
const { executeNode } = require('./sim');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', require('./routes'));

mongoose.connect('mongodb://localhost:27017/behaviorTree', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('start-execution', async (treeID) => {
    const nodes = await Node.find({ treeID });
    const edges = await Edge.find({ treeID });

    const rootNode = nodes.find(node => node.type === 'rootNode');
    if (rootNode) {
      await executeNode(rootNode.id, nodes, edges, io);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
