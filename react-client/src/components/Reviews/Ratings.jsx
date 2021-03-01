import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RatingsBreakdownList from './RatingsBreakdownList.jsx';

const Ratings = (props) => {
  const [recommendedPercent, setRecommendedPercent] = useState(0);
  const [percentagePerRating, setPercentagePerRating] = useState(false);
  useEffect(() => {
    if (props.metadata) {
      findRecommendedPercent();
      findPercentagePerRating();
    }
  }, [props.metadata]);


  const findPercentagePerRating = () => {
    let percentages = {};
    let ratings = props.metadata.ratings;
       let totalVotes = 0;
    for (let scoreKey in ratings) {
      totalVotes += Number(ratings[scoreKey]);
    }

    for (let key in ratings) {
      let percentage = Math.round((Number(ratings[key]) / totalVotes) * 100);
      percentages[key] = percentage;
    }
    setPercentagePerRating(percentages);
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
      <RatingsBreakdownList percentagePerRating={percentagePerRating} />
      <div>
        {props.avgRating}
      </div>
      <div>
        {recommendedPercent}
        % of reviewers recommend this product
      </div>
    </div>
  );
};

export default Ratings;
