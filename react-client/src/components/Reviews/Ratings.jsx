import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

const Ratings = (props) => {
  const [recommendedPercent, setRecommendedPercent] = useState(0);
  useEffect(() => {
    findRecommendedPercent()
  }, [props.metadata]);
  // if no ratings are given and no recommended are given. it will default to empty obj
  const findPercentageOfEachRating = () => {
    // takes the ratings key and gives the
    let one;
    let two;
    let three;
    let four;
    let five;
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
    if (totalVotes === 0) {
      setRecommendedPercent(0);
    } else {
      setRecommendedPercent(Math.round((trueVotes / totalVotes) * 100));
    }
  };

  return (
    <div>
      <span>
        RATINGS
        & REVIEWS
      </span>
      <div>
        {props.avgRating}
      </div>
      <div>
        {recommendedPercent}
        % of reviewers recommend this product
      </div>
    </div>
  )
}

export default Ratings;
