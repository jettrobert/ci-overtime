import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from 'reactflow';

import './styles/ButtonEdge.css';

interface CustomEdgeProps extends EdgeProps {
  data: {
    setDrawerOpen: (open: boolean) => void;
    setSelectedEdgeId: (id: string) => void;
    selectedNodeType?: string;
    numChildren?: number;
    onNodesCreated?: () => void;
  };
}

const ButtonEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const { setDrawerOpen, setSelectedEdgeId } = data;
  const { setEdges, setNodes, getNodes, getEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setDrawerOpen(true);
    setSelectedEdgeId(id);
    console.log('9a. Edge clicked, opening drawer.');
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="button-wrapper">
            <button className="edgebutton" onClick={onEdgeClick}>
              +
            </button>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default ButtonEdge;
