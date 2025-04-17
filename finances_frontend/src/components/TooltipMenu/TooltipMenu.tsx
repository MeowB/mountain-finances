import React, { useState, useEffect, useRef } from 'react';
import './TooltipMenu.scss';

const TooltipMenu = ({ potData, onEdit, onDelete }: { potData: any, onEdit: (potData: any) => void, onDelete: (potData: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    onEdit(potData);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(potData);
    setIsOpen(false);
  };

  return (
    <div className="tooltipMenu" ref={tooltipRef}>
      <button onClick={() => setIsOpen(!isOpen)}>⋯</button>
      {isOpen && (
        <div className="tooltipContent">
          <button onClick={handleEditClick}>Edit Pot</button>
          <button onClick={handleDeleteClick}>Delete Pot</button>
        </div>
      )}
    </div>
  );
};

export default TooltipMenu;
