import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 10px;
`;

const PopupMenu = ({ position, onSelectOption }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={() => onSelectOption(null)}
      style={{
        overlay: { zIndex: 1000, backgroundColor: 'transparent' },
        content: { top: position.y, left: position.x, width: '150px', padding: '0' },
      }}
    >
      <Menu>
        <button onClick={() => onSelectOption('Sequential')}>Sequential</button>
        <button onClick={() => onSelectOption('Conditional')}>Conditional</button>
        <button onClick={() => onSelectOption('Concurrent')}>Concurrent</button>
      </Menu>
    </Modal>
  );
};

export default PopupMenu;
