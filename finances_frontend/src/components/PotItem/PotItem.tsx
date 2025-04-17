import React from 'react';
import './PotItem.scss';

interface PotItemProps {
  name: string;
  totalSaved: number;
  color: string;
}

const PotItem: React.FC<PotItemProps> = ({ name, totalSaved, color }) => {
  return (
    <div className="potItem">
      <p className="potName">{name}</p>
      <p className="potAmount">${totalSaved}</p>
      <div className="potColor" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default PotItem;
