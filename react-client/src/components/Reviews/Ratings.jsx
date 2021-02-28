import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

const Ratings = (props) => {
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    findAvgRating();
    // console.log('avg rating', averageRating);
  }, [props.metadata]);

  const findAvgRating = () => {
    if (!props.metadata.ratings) {
      return '';
    }
    let ratingsData = props.metadata.ratings;
    let totalScore = 0;
    let amountOfRatings = 0;
    for (let key in ratingsData) {
      let value = Number(ratingsData[key])
      let actualValue = key * value;
      totalScore += actualValue;
      amountOfRatings += value;
    };
    let averageScore = totalScore / amountOfRatings;
    let rounded = Math.round(averageScore * 4) / 4;
    setAverageRating(rounded);
  };

  return (
    <div>
      RATINGS
    </div>
  )
}

export default Ratings;
