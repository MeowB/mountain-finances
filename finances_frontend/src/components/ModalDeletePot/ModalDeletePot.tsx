import React from 'react';
import './ModalDeletePot.scss';

const ModalDeletePot = ({ setModalIsOpen, potData, handleDelete }: { setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>, potData: any, handleDelete: (id: number) => void }) => {
  const handleConfirm = () => {
    handleDelete(potData.id);
    setModalIsOpen(false);
  };

  return (
    <div className="modalDeletePot">
      <h3>Delete Pot</h3>
      <p>Are you sure you want to delete the pot "{potData.name}"? This action cannot be undone.</p>
      <div className="buttons">
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalDeletePot;
