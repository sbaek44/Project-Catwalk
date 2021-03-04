import React from 'react';

const CharacteristicsElement = ({ characteristic }) => {
  let percent = characteristic[1].value * 20;
  let first;
  let second;
  let third;
  if (characteristic[0] === "Quality" || characteristic[0] === "Comfort") {
    first = 'Poor';
    second = '';
    third = "Perfect"
  } else if (characteristic[0] === 'Fit' || characteristic[0] === 'Length') {
    first = 'Too small';
    second = 'Perfect';
    third = "Too Large"
  }

  return (
    <div>
      {characteristic[0]}
      <div className="container">
        <div className="characteristicsTriple"></div>
        <div className="characteristicsTriple"></div>
        <div className="characteristicsTriple"></div>
        <div style={{left: `${percent}%`}} className="selector"></div>
      </div>
      <div className="container" style={{display: 'flex', flexDirection: 'row'}}>
        <div className="triple-text">{first}</div>
        <div className="triple-text">{second}</div>
        <div className="triple-text">{third}</div>
      </div>
    </div>
  );
};

export default CharacteristicsElement;
