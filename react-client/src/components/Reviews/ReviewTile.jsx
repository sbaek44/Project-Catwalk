import React from 'react';
import header from '../../../../config.js';
import axios from 'axios'

const ReviewTile = (props) => {
  console.log(props)
  const date = new Date(props.review.date).toUTCString().slice(0, -12);
  let form;
  if (!props.review.recommend) {
    form = '';
  } else {
    form = <div>I recommend this product</div>;
  }

  const markAsHelpful = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_id}/helpful`, {
      body: props.review.body,
      date: props.review.date,
      helpfulness: props.review.helpfulness + 1,
      photos: props.review.photos,
      recommend: props.review.recommend,
      response: props.review.response,
      review_id: props.review.review_id,
      reviewer_name: props.review.reviewer_name,
      summary: props.review.summary
    }, header)
      .then(() => {
        props.getReviews()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      *****
      <div> {props.review.reviewer_name}, {date} </div>
      <div> {props.review.summary} </div>
      <div> {props.review.body} </div>
      {form}
      <div> <span>Helpful? <div onClick={markAsHelpful} >Yes</div></span>  ({props.review.helpfulness}) | report </div>
    </div>
  );
};

export default ReviewTile;
