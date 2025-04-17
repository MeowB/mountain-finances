import React from 'react';
import PotItem from '../PotItem/PotItem';
import './PotsList.scss';

interface Pot {
  id: number;
  name: string;
  totalSaved: number;
  color: string;
}

interface PotsListProps {
  pots: Pot[];
}

const PotsList: React.FC<PotsListProps> = ({ pots }) => {
  return (
    <div className="potsList">
      {pots.map(pot => (
        <PotItem key={pot.id} name={pot.name} totalSaved={pot.totalSaved} color={pot.color} />
      ))}
    </div>
  );
};

export default PotsList;
