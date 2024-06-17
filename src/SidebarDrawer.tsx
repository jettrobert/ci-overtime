import React from 'react';
import { Drawer, Button } from 'rsuite';
import { Node } from 'reactflow';
import DrawerContent from './DrawerContent'; // Import the new component

interface Position {
  x: number;
  y: number;
}

interface CustomNode extends Node {
  id: string;
  position: Position;
  data: {
    label: string;
  };
  selected?: boolean;
}

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onSave: (
    nodeType: string, 
    numChildren: number, 
    additionalData?: { 
      nodeName?: string;
      actionOperation?: string; 
      actionClass?: string;
      actionDescription?: string;
      conditionIf?: string;
      conditionOperator?: string;
      conditionCategory?: string;
      conditionCondition?: string;
    }
  ) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ open, onClose, nodes, setNodes, onSave }) => {
  const selectAll = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: true,
      }))
    );
  };

  return (
    <Drawer size={'xs'} placement={'right'} backdrop={false} open={open} onClose={onClose}>
      <Drawer.Header>
        <Drawer.Title>Flow Control</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <DrawerContent onSave={onSave} />
      </Drawer.Body>
      <Drawer.Actions>
        <Button onClick={selectAll}>Select all nodes</Button>
      </Drawer.Actions>
    </Drawer>
  );
};

export default SidebarDrawer;
