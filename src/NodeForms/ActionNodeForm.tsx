import React, { useState } from 'react';
import { Input, Button, Dropdown, Toggle } from 'rsuite';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './ActionNodeFormStyles.css';

interface ActionNodeFormProps {
  onSave: (data: { numChildren: number, nodeName: string, actionDescription: string, actionMode: string, actionType: string }) => void;
}

const ActionNodeForm: React.FC<ActionNodeFormProps> = ({ onSave }) => {
  const [nodeName, setNodeName] = useState('My Action Node');
  const [actionDescription, setActionDescription] = useState('');
  const [actionMode, setActionMode] = useState('Code');
  const [actionType, setActionType] = useState('Python');
  const [numChildren] = useState(0);

  const handleSaveAction = () => {
    onSave({ numChildren, nodeName, actionDescription, actionMode, actionType });
  };

  return (
    <div className="form-content">
      <div className="form-content">
        <h3>Action Node</h3>
      </div>
      <div className="description-box">
        Action nodes perform an action once triggered by the parent node.
      </div>
      <div className="form-field">
        <p>Give this node a name.</p>
        <Input value={nodeName} onChange={value => setNodeName(value)} />
      </div>
      <div className="form-field">
        <p>Mode</p>
        <Toggle 
          checkedChildren="Code" 
          unCheckedChildren="GUI"
          checked={actionMode === 'Code'} 
          onChange={checked => setActionMode(checked ? 'Code' : 'GUI')} 
        />
      </div>
      <div className="code-form-field">
      <div>
        <Dropdown className='code-type-button' title={actionType} onSelect={value => setActionType(value as string)}>
          <Dropdown.Item eventKey="Python">Python</Dropdown.Item>
          <Dropdown.Item eventKey="Javascript">JavaScript</Dropdown.Item>
          <Dropdown.Item eventKey="SQL">SQL</Dropdown.Item>
        </Dropdown>
      </div>
        <CodeMirror
          value={actionDescription}
          className='code-block'
          options={{
            mode: actionType,
            theme: 'neat',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setActionDescription(value);
          }}
        />
      </div>
      <Button onClick={handleSaveAction}>
        Save
      </Button>
    </div>
  );
};

export default ActionNodeForm;
