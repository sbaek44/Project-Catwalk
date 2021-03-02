import React, { useEffect, useState } from 'react';
import CharacteristicsElement from './CharacteristicsElement.jsx';

const CharacteristicsList = ({ characteristics }) => {
  const [splitChars, setSplitChars] = useState([]);

  const splitCharacteristics = () => {
    let arrOfChars = [];
    Object.keys(characteristics).map((key) => {
      arrOfChars.push([key, characteristics[key]]);
    });
    setSplitChars(arrOfChars);
  };

  useEffect(() => {
    if (characteristics) {
      splitCharacteristics();
    }
  }, [characteristics]);

  return (
    <div>
      { splitChars.map((char) => (
        <CharacteristicsElement characteristic={char} key={char[1].id} />
      )) }
    </div>
  );
};

export default CharacteristicsList;
