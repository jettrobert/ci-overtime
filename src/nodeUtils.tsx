import { Node, Edge, Position } from 'reactflow';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdQuestionMark, MdRectangle } from 'react-icons/md';
import { TbArrowsRight, TbRectangleFilled, TbListCheck } from 'react-icons/tb';
import { hierarchy, tree, HierarchyNode } from 'd3-hierarchy';

// Define a type for the d3 hierarchy node data
type HierarchyNodeData = Node & { children?: HierarchyNodeData[] };

// Create the d3 hierarchy
const createHierarchy = (rootNode: Node, edges: Edge[], nodeMap: Map<string, Node>): HierarchyNode<HierarchyNodeData> => {
  const rootHierarchyNode: HierarchyNodeData = { ...rootNode, children: [] };
  const queue: HierarchyNodeData[] = [rootHierarchyNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!currentNode) continue;

    const children = edges
      .filter(edge => edge.source === currentNode.id)
      .map(edge => nodeMap.get(edge.target))
      .filter(child => child !== undefined) as Node[]; // Ensure no undefined values
    children.sort((a, b) => b.position.y - a.position.y);

    currentNode.children = children;
    queue.push(...(currentNode.children as HierarchyNodeData[]));
  }

  return hierarchy(rootHierarchyNode);
};

export const getLayoutedElements = (nodes: Node[], edges: Edge[], useD3Layout = true): { nodes: Node[], edges: Edge[] } => {
  if (!useD3Layout) {
    return { nodes, edges };
  }

  // Create a map of node ids to nodes
  const nodeMap = new Map(nodes.map(node => [node.id, node]));

  // Create a root node for the d3 tree layout
  const rootNode = nodes.find(node => edges.every(edge => edge.target !== node.id));
  if (!rootNode) {
    throw new Error('No root node found');
  }

  // Build the d3 hierarchy
  const root = createHierarchy(rootNode, edges, nodeMap);

  // Create the tree layout
  const treeLayout = tree<HierarchyNodeData>().nodeSize([120, 120]);
  treeLayout(root);

  // Update node positions based on the d3 layout
  const layoutedNodes = nodes.map(node => {
    const nodeData = root.descendants().find(d => d.data.id === node.id);
    return {
      ...node,
      position: { x: nodeData?.x ?? 0, y: nodeData?.y ?? 0 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    };
  });

  return { nodes: layoutedNodes, edges };
};

// HANDLE NODE ID/ICON CREATION

export type NodeType = 'Selector' | 'Sequence' | 'Parallel' | 'Condition' | 'Action';

export const nodeCount: { [key in NodeType]: number } = {
  Selector: 0,
  Sequence: 0,
  Parallel: 0,
  Condition: 0,
  Action: 0,
};

export const generateNodeId = (treeID: string, nodeType: NodeType): string => {
  if (!(nodeType in nodeCount)) {
    throw new Error(`Unknown node type: ${nodeType}`);
  }
  nodeCount[nodeType] += 1;
  return `${treeID}-${nodeType}-node-${nodeCount[nodeType]}`;
};

const nodeTypeIcons: { [key in NodeType]: React.ComponentType } = {
  Selector: FaArrowRightLong,
  Sequence: MdQuestionMark,
  Parallel: TbArrowsRight,
  Condition: TbRectangleFilled,
  Action: MdRectangle,
};

// END OF NODE ID/ICON CREATION

export const createNodesAndEdges = async (
  nodeType: NodeType,
  nodes: Node[],
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  treeID: string,
  additionalData?: { actionOperation?: string, actionClass?: string, status?: string }
) => {
  console.log('createNodesAndEdges called with', { nodeType });

  const newNodes: Node[] = [];

  const controlFlowNodeId = generateNodeId(treeID, nodeType);
  console.log(`Generated control flow node ID: ${controlFlowNodeId}`);
  const controlFlowNode: Node = {
    id: controlFlowNodeId,
    data: {
      label: `${controlFlowNodeId}`,
      icon: nodeTypeIcons[nodeType],
      nodeOrderNumber: 0, // default value, will be updated later
      status: 'Not-yet-triggered',
      ...(additionalData || {})
    },
    position: { x: 150, y: 150 }, // Adjusted position to avoid overlapping with the root node
    type: `${nodeType.toLowerCase()}Node`,
  };

  newNodes.push(controlFlowNode);
  console.log('Control flow node created:', controlFlowNode);

  const updatedNodes = nodes.map(node => node.id === 'frame-node-0' ? { ...node, deletable: true } : node);
  setNodes([...updatedNodes, ...newNodes]);
  setEdges(edges);
};

// Function to recalculate layout on edge addition
export const recalculateNodeOrderAndLayout = (
  nodes: Node[],
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  update: boolean = true
) => {
  try {
    console.log("Repositioning nodes function called");
    const layoutedElements = getLayoutedElements(nodes, edges, update);
    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutedElements;

    layoutedNodes.forEach((node) => {
      const parentEdge = layoutedEdges.find(edge => edge.target === node.id);
      if (parentEdge) {
        const siblingNodes = layoutedEdges
          .filter(edge => edge.source === parentEdge.source)
          .map(edge => layoutedNodes.find(n => n.id === edge.target))
          .filter(n => n !== undefined) as Node[];

        siblingNodes.sort((a, b) => a.position.x - b.position.x);
        siblingNodes.forEach((siblingNode, index) => {
          siblingNode.data.nodeOrderNumber = index;
        });
      }
    });

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    console.log("Nodes have been repositioned");
  } catch (error) {
    console.error("Error during node repositioning:", error);
  }
};



