import React, { useState } from 'react';
import { Input, InputPicker, Button } from 'rsuite';
import './ConditionNodeFormStyles.css';

interface ConditionNodeFormProps {
  onSave: (data: { numChildren: number; conditionIf: string; conditionOperator: string; conditionCondition: string; conditionCategory: string }) => void;
}

const operators = [
  { category: "Basic Operators", name: "exists" },
  { category: "Basic Operators", name: "does not exist" },
  { category: "Numeric Operators", name: "equals" },
  { category: "Numeric Operators", name: "does not equal" },
  { category: "Numeric Operators", name: "is greater than" },
  { category: "Numeric Operators", name: "is greater than or equal to" },
  { category: "Numeric Operators", name: "is less than" },
  { category: "Numeric Operators", name: "is less than or equal to" },
  { category: "Text Operators", name: "is equal to" },
  { category: "Text Operators", name: "is not equal to" },
  { category: "Text Operators", name: "contains" },
  { category: "Text Operators", name: "does not contain" },
  { category: "Text Operators", name: "starts with" },
  { category: "Text Operators", name: "does not start with" },
  { category: "Text Operators", name: "ends with" },
  { category: "Text Operators", name: "does not end with" },
  { category: "Text Operators", name: "matches pattern" },
  { category: "Text Operators", name: "does not match pattern" },
  { category: "Time Operators", name: "equals" },
  { category: "Time Operators", name: "does not equal" },
  { category: "Time Operators", name: "is later than" },
  { category: "Time Operators", name: "is earlier than" },
  { category: "Time Operators", name: "is later than or equal to" },
  { category: "Time Operators", name: "is earlier than or equal to" },
  { category: "Array Operators", name: "contains" },
  { category: "Array Operators", name: "does not contain" },
  { category: "Array Operators", name: "has array length equal to" },
  { category: "Array Operators", name: "has array length not equal to" },
  { category: "Array Operators", name: "has array length less than" },
  { category: "Array Operators", name: "has array length less than or equal to" },
  { category: "Array Operators", name: "has array length greater than" },
  { category: "Array Operators", name: "has array length greater than or equal to" },
];

const ConditionNodeForm: React.FC<ConditionNodeFormProps> = ({ onSave }) => {
  const [conditionIf, setConditionIf] = useState('');
  const [conditionOperator, setConditionOperator] = useState('');
  const [conditionCategory, setConditionCategory] = useState('');
  const [conditionCondition, setConditionCondition] = useState('');

  const handleSaveAction = () => {
    const data = { numChildren: 0, conditionIf, conditionOperator, conditionCondition, conditionCategory };
    console.log('1. ConditionNode data:', data);
    onSave(data);
  };

  const handleOperatorChange = (value: string, item: any) => {
    const selectedItem = operators.find(operator => operator.name === value);
    console.log('1. ConditionNode data Selected Operator:', selectedItem);
    if (selectedItem) {
      setConditionOperator(value);
      setConditionCategory(selectedItem.category);
    }
  };

  return (
    <div className="form-content">
      <div className="form-content">
        <h3>Condition Node</h3>
      </div>
      <div className="description-box">
        Conditions nodes will return success if a certain condition is met, and will
        otherwise return failure.
      </div>
      <div className="form-field">
        <p>Condition If</p>
        <Input as="textarea" rows={3} placeholder="Sentiment Analysis" value={conditionIf} onChange={setConditionIf} />
      </div>
      <div className="form-field">
        <p>Condition Operator</p>
        <InputPicker
          data={operators}
          style={{ width: 200, marginTop: 20, marginBottom: 20 }}
          groupBy="category"
          labelKey="name"
          valueKey="name"
          placeholder="Operator"
          value={conditionOperator}
          onChange={handleOperatorChange}
        />
      </div>
      <div className="form-field">
        <p>Condition Condition</p>
        <Input as="textarea" rows={3} placeholder="Happy" value={conditionCondition} onChange={setConditionCondition} style={{ marginBottom: 20 }} />
      </div>
      <div className="conditional-statements">return <span style={{ background: "#a9ff19", padding: "3px", borderRadius: "10px" }}>success</span>.</div>
      <div className="conditional-statements">Else, return <span style={{ background: "#feb5b1", padding: "3px", borderRadius: "10px" }}>failure</span>.</div>
      <Button onClick={handleSaveAction}>
        Save
      </Button>
    </div>
  );
};

export default ConditionNodeForm;
