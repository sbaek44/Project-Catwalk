import React from 'react';

const CharacteristicsElement = ({ characteristic }) => (
  <div>
    {characteristic[0]}
    {characteristic[1].value}
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <div className="characteristicsTriple"></div>
    <div className="characteristicsTriple"></div>
    <div className="characteristicsTriple"></div>
    </div>
  </div>
);

export default CharacteristicsElement;
