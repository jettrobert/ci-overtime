import React, { useState } from 'react';
import { Button, Tooltip, Whisper, InputNumber, Input, RadioTile, RadioTileGroup, useMediaQuery, SelectPicker } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdQuestionMark, MdRectangle } from 'react-icons/md'; // Example icons
import { TbArrowsRight, TbRectangleFilled, TbListCheck, TbXboxXFilled, TbCircleCheckFilled } from 'react-icons/tb';
import { HiOutlineInformationCircle } from 'react-icons/hi'; // Example icons
import './styles/DrawerContent.css'; // Import your custom styles
import CustomHighlight from './CustomHighlight';
import ConditionNodeForm from './NodeForms/ConditionNodeForm';
import ActionNodeForm from './NodeForms/ActionNodeForm';

const selectorTooltip = (
  <Tooltip>
    Executes children from left to right and returns success when any child returns success. Returns failure if no child returns success.
  </Tooltip>
);

const sequenceTooltip = (
  <Tooltip>
    Executes children from left to right and returns failure if any child returns failure.
  </Tooltip>
);

const parallelTooltip = (
  <Tooltip>
    Executes all children in parallel. If any child returns failure, all return failure.
  </Tooltip>
);

const conditionTooltip = (
  <Tooltip>
    Checks if a condition in the environment is met. This node cannot have children.
  </Tooltip>
);

const actionTooltip = (
  <Tooltip>
    Performs an action. This node cannot have children.
  </Tooltip>
);

interface DrawerContentProps {
  onSave: (nodeType: string, numChildren: number, additionalData?: { nodeName?: string; actionOperation?: string; actionClass?: string; actionDescription?: string;  conditionIf?: string; conditionOperator?: string; conditionCategory?: string; conditionCondition?: string }) => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ onSave }) => {
  const [selectedNode, setSelectedNode] = useState<string | number | null>(null);
  const [numChildren, setNumChildrenLocal] = useState(1);
  const [isInLine] = useMediaQuery("s");

  const handleSave = (numChildren: number, additionalData?: { nodeName?: string; actionOperation?: string; actionClass?: string; actionDescription?: string; conditionIf?: string; conditionOperator?: string; conditionCategory?: string; conditionCondition?: string }) => {
    if (selectedNode) {
      console.log('handleSave in DrawerContent called');
      onSave(selectedNode.toString(), numChildren, additionalData);
    }
  };

  const renderForm = () => {
    switch (selectedNode) {
      case 'Selector':
        return (
          <div className="form-content">
            <h3>Selector Node</h3>
            <div className="description-box">
              <CustomHighlight text="The Selector node executes children from left to right and will return success to its parent node as soon as any child returns success. If no child returns success, the node will return failure." />
            </div>
            <div className="form-field">
              <p>Give this node a name:</p>
              <Input placeholder={"My Selector Node"} />
            </div>
            <div className="form-field">
              <p>How many children will this node have?</p>
              <InputNumber min={1} value={numChildren} onChange={(value) => setNumChildrenLocal(value as number)} />
            </div>
            <Button onClick={() => handleSave(numChildren)}>
              Save
            </Button>
          </div>
        );

      case 'Sequence':
        return (
          <div className="form-content">
            <h3>Sequence Node</h3>
            <div className="description-box">
              <CustomHighlight text="The Selector node executes children from left to right and will return failure to its parent node if any child returns failure. If no child returns failure, the node will return success." />
            </div>
            <div className="form-field">
              <p>Give this node a name:</p>
              <Input placeholder={"My Sequence Node"} />
            </div>
            <div className="form-field">
              <p>How many children will this node have?</p>
              <InputNumber min={1} value={numChildren} onChange={(value) => setNumChildrenLocal(value as number)} />
            </div>
            <Button onClick={() => handleSave(numChildren)}>
              Save
            </Button>
          </div>
        );

      case 'Parallel':
        return (
          <div className="form-content">
            <h3>Parallel Node</h3>
            <div className="description-box">
              <CustomHighlight text="The Parallel node executes every child simultaneously. You can toggle this to: return success if any node returns success, to return failure if any node returns failure, or to return success if every node return success." />
            </div>
            <div className="form-field">
              <p>Give this node a name:</p>
              <Input placeholder={"My Parallel Node"} />
            </div>
            <div className="form-field">
              <p>How many children will this node have?</p>
              <InputNumber min={1} value={numChildren} onChange={(value) => setNumChildrenLocal(value as number)} />
            </div>
            <div className="radio-group">
              <RadioTileGroup defaultValue="blank" inline={isInLine} aria-label="How should this work?">
                <RadioTile
                  icon={<Icon as={TbCircleCheckFilled} />}
                  label="Success if ANY success."
                  value="blank"
                >
                  This node will return success as soon as any of its child nodes return success.
                </RadioTile>
                <RadioTile
                  icon={<Icon as={TbXboxXFilled} />}
                  label="Failure if ANY failure."
                  value="template"
                >
                  This node will return failure as soon as any of its child nodes return failure.
                </RadioTile>
                <RadioTile
                  icon={<Icon as={TbListCheck} />}
                  label="Success if ALL success."
                  value="import"
                >
                  This node will return success if all of its child nodes return success.
                </RadioTile>
              </RadioTileGroup>
            </div>
            <Button onClick={() => handleSave(numChildren)}>
              Save
            </Button>
          </div>
        );

      case 'Condition':
        return <ConditionNodeForm onSave={(data) => handleSave(0, { conditionIf: data.conditionIf, conditionOperator: data.conditionOperator, conditionCategory: data.conditionCategory, conditionCondition: data.conditionCondition })} />;
      case 'Action':
        return <ActionNodeForm onSave={(data) => handleSave(data.numChildren, { nodeName: data.nodeName, actionOperation: data.actionOperation || "CREATE", actionClass: data.actionClass || "API", actionDescription: data.actionDescription || "Generic Action" })} />;
      default:
        return null;
    }
  };

  return (
    <div className="drawer-content">
      <div className="button-section">
        <h3 className="section-header">Control Flow Nodes</h3>
        <div className="button-group">
          <div className="button-item">
            <Button className="icon-button" onClick={() => setSelectedNode('Selector')}><FaArrowRightLong size={30} /></Button>
            <p className="button-label">Selector
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={selectorTooltip}>
                <span className="info-icon"><HiOutlineInformationCircle size={14} /></span>
              </Whisper></p>
          </div>
          <div className="button-item">
            <Button className="icon-button" onClick={() => setSelectedNode('Sequence')}><MdQuestionMark size={30} /></Button>
            <p className="button-label">Sequence
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={sequenceTooltip}>
                <span className="info-icon"><HiOutlineInformationCircle size={14} /></span>
              </Whisper></p>
          </div>
          <div className="button-item">
            <Button className="icon-button" onClick={() => setSelectedNode('Parallel')}><TbArrowsRight size={30} /></Button>
            <p className="button-label">Parallel
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={parallelTooltip}>
                <span className="info-icon"><HiOutlineInformationCircle size={14} /></span>
              </Whisper></p>
          </div>
        </div>
      </div>
      <div className="button-section">
        <h3 className="section-header">Task Nodes</h3>
        <div className="button-group">
          <div className="button-item">
            <Button className="icon-button" onClick={() => setSelectedNode('Condition')}><TbRectangleFilled size={30} /></Button>
            <p className="button-label">Condition
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={conditionTooltip}>
                <span className="info-icon"><HiOutlineInformationCircle size={14} /></span>
              </Whisper></p>
          </div>
          <div className="button-item">
            <Button className="icon-button" onClick={() => setSelectedNode('Action')}><MdRectangle size={30} /></Button>
            <p className="button-label">Action
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={actionTooltip}>
                <span className="info-icon"><HiOutlineInformationCircle size={14} /></span>
              </Whisper></p>
          </div>
        </div>
        {selectedNode === 'Selector' ||
          selectedNode === 'Sequence' ||
          selectedNode === 'Parallel' ||
          selectedNode === 'Condition' ||
          selectedNode === 'Action' ?
          renderForm() : null}
      </div>
    </div>
  );
};

export default DrawerContent;
