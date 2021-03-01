import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

const Ratings = (props) => {
  const [averageRating, setAverageRating] = useState(0);
  const [recommendedPercent, setRecommendedPercent] = useState(0);
  useEffect(() => {
    findAvgRating();
    findRecommendedPercent()
  }, [props.metadata]);
  // if no ratings are given and no recommended are given. it will default to empty obj

  const findAvgRating = () => {
    if (!props.metadata.ratings) {
      return '';
    }
    const ratingsData = props.metadata.ratings;
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

  const findRecommendedPercent = () => {
    if (!props.metadata.recommended) {
      return '';
    }
    let trueVotes = 0;
    let falseVotes = 0;
    if (props.metadata.recommended.true) {
      trueVotes = Number(props.metadata.recommended.true);
    }
    if (props.metadata.recommended.false) {
      falseVotes = Number(props.metadata.recommended.false);
    }
    let totalVotes = trueVotes + falseVotes;
    let res = Math.round((trueVotes / totalVotes) * 100);
    console.log(trueVotes, falseVotes, totalVotes);
    if (totalVotes === 0) {
      setRecommendedPercent(0);
    } else {
      setRecommendedPercent(Math.round((trueVotes / totalVotes) * 100));
    }

    console.log(props, recommendedPercent, res);
  };

  return (
    <div>
      <span>
        RATINGS
        & REVIEWS
      </span>
      <div>
        {averageRating}
      </div>
      <div>
        {recommendedPercent}
        % of reviewers recommend this product
      </div>
    </div>
  )
}

export default Ratings;
