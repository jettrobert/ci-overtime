// utils.ts

export const handleSave = (
    nodeType: string,
    numChildren: number,
    setSelectedNodeType: React.Dispatch<React.SetStateAction<string | null>>,
    setNumChildren: React.Dispatch<React.SetStateAction<number>>,
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    console.log('handleSave called');
    console.log(`Node type: ${nodeType}, Number of children: ${numChildren}`);
    setSelectedNodeType(nodeType);
    setNumChildren(numChildren);
    setDrawerOpen(false);
  };
  