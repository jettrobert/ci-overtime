// Modal.jsx
import React, { useState } from 'react';
import '../assets/Modal.css';
import icons from '../backups/icons/icons';
import { formConfig } from '../assets/formConfig'

const Modal = ({ isOpen, onClose, onOptionSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [disableMainOptions, setDisableMainOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [step, setStep] = useState(1); // Step 1: Initial selection, Step 2: Conditional appearance

  if (!isOpen) return null;

  const handleMethodSelect = (method) => {
    if (!disableMainOptions || selectedOption === 'Webhook' || selectedOption === 'API Call') {
      setSelectedMethod(method);
    }
  };

  const handleOptionSelect = (option) => {
    if (!disableMainOptions || selectedOption === 'Webhook' || selectedOption === 'API Call') {
      setSelectedOption(option);
      setDisableMainOptions(false); // Reset disable state when a regular option is selected
    }
  };

  const handleWebhookOrApiCallSelect = (option) => {
    setDisableMainOptions(true);
    setSelectedOption(option);
    setSelectedMethod(null);
  };

  const getFormFields = () => {
    if (selectedOption === 'Webhook' || selectedOption === 'API Call') {
      return formConfig[selectedOption] || [];
    }
    return (formConfig[selectedMethod] && formConfig[selectedMethod][selectedOption]) || [];
  };

  const getIconName = (option) => {
    return option.toLowerCase().replace(/ /g, '_');
  };

  const handleNext = () => {
    setStep(2); // Move to the next step
  };

  const handleBack = () => {
    setStep(1); // Move back to the initial step
  };

  const handleAdd = () => {
    const icon =icons[getIconName(selectedOption)];
    const label = `${selectedOption}`;
    onOptionSelect({ icon, label, method: selectedMethod, option: selectedOption});
    onClose();
  };

  const formFields = getFormFields();

  return (
    <div className="modal">
      <div className="modal-content">
        {step === 1 ? (
          <>
            <div className="method-buttons">
              <button
                className={`method-button manual ${disableMainOptions ? 'disabled' : ''} ${selectedMethod === 'Manual' ? 'selected-manual' : ''}`}
                onClick={() => handleMethodSelect('Manual')}
              >
                Manual
              </button>
              <button
                className={`method-button script ${disableMainOptions ? 'disabled' : ''} ${selectedMethod === 'Script' ? 'selected-script' : ''}`}
                onClick={() => handleMethodSelect('Script')}
              >
                Script
              </button>
              <button
                className={`method-button ai ${disableMainOptions ? 'disabled' : ''} ${selectedMethod === 'AI' ? 'selected-ai' : ''}`}
                onClick={() => handleMethodSelect('AI')}
              >
                AI
              </button>
            </div>

            <div className="options-container">
              <div className="options-column">
                <button className={`option-button ${selectedOption === 'Create' ? 'selected-option' : ''}`} onClick={() => handleOptionSelect('Create')}>
                  <img src={icons.create} alt="Create" className="icon" /><br />Create
                </button>
                <button className={`option-button ${selectedOption === 'Read' ? 'selected-option' : ''}`} onClick={() => handleOptionSelect('Read')}>
                  <img src={icons.read} alt="Read" className="icon" /><br />Read
                </button>
                <button className={`option-button ${selectedOption === 'Update' ? 'selected-option' : ''}`} onClick={() => handleOptionSelect('Update')}>
                  <img src={icons.update} alt="Update" className="icon" /><br />Update
                </button>
                <button className={`option-button ${selectedOption === 'Delete' ? 'selected-option' : ''}`} onClick={() => handleOptionSelect('Delete')}>
                  <img src={icons.delete} alt="Delete" className="icon" /><br />Delete
                </button>
              </div>
            </div>

            <div>
              <div onClick={() => setShowAdvanced(!showAdvanced)} className="advanced-button">
                Advanced Options {showAdvanced ? '▲' : '▼'}
              </div>
              {showAdvanced && (
                <div className="advanced-options">
                  {['Validate', 'Authorize', 'Notify', 'Process', 'Transform', 'Analyze', 'Merge', 'Configure', 'Schedule', 'Monitor', 'Optimize', 'Deploy', 'Rollback'].map((option) => (
                    <button key={option} className={`option-button ${selectedOption === option ? 'selected-option' : ''}`} onClick={() => handleOptionSelect(option)}>
                      <img src={icons[getIconName(option)]} alt={option} className="icon" /><br />{option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="api-webhook">
              <button className={`special-button ${selectedOption === 'Webhook' ? 'selected-special' : ''}`} onClick={() => handleWebhookOrApiCallSelect('Webhook')}>Webhook</button>
              <button className={`special-button ${selectedOption === 'API Call' ? 'selected-special' : ''}`} onClick={() => handleWebhookOrApiCallSelect('API Call')}>API Call</button>
            </div>
          </>
        ) : (
          <div>
            <div className='form-header-container'>
              <div className='form-method-header'>{selectedMethod}</div>
              <div className='form-option-header'>{selectedOption}</div>
              </div>
            <form>
              {formFields.map((field, index) => {
                if (field.type === 'dropdown') {
                  return (
                    <div key={index} className="form-field">
                      <label>{field.name}</label>
                      <select>
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (field.type === 'text') {
                  return (
                    <div key={index} className="form-field">
                      <label>{field.name}</label>
                      <input type="text" />
                    </div>
                  );
                }
                if (field.type === 'textarea') {
                  return (
                    <div key={index} className="form-field">
                      <label>{field.name}</label>
                      <input type="textarea" />
                    </div>
                  );
                }
                return null;
              })}
            </form>
          </div>
        )}

        <div className="modal-footer">
          {step === 1 && <button onClick={onClose} className="cancel-button">Cancel</button>}
          {step === 1 && <button onClick={handleNext} className="next-button">Next</button>}
          {step === 2 && <button onClick={handleBack} className="back-button">Back</button>}
          {step === 2 && <button onClick={handleAdd} className="add-button">Add</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;