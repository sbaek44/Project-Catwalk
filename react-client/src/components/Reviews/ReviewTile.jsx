import React from 'react';
import header from '../../../../config.js';
import axios from 'axios'

const ReviewTile = (props) => {
  // console.log(props)
  const date = new Date(props.review.date).toUTCString().slice(4, -12);
  let day = date.slice(0,3);
  let month = date.slice(-9, -6);
  let year = date.slice(-5);
  let dateAndUser = `${props.review.reviewer_name}, ${month} ${day}, ${year}`;
  let form;
  if (!props.review.recommend) {
    form = '';
  } else {
    form = <div>I recommend this product</div>;
  }

  let reviewBody = {
    body: props.review.body,
    date: props.review.date,
    helpfulness: props.review.helpfulness,
    photos: props.review.photos,
    recommend: props.review.recommend,
    response: props.review.response,
    review_id: props.review.review_id,
    reviewer_name: props.review.reviewer_name,
    summary: props.review.summary,
  };

  const markAsHelpful = () => {
    reviewBody.helpfulness += 1
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_id}/helpful`, reviewBody, header)
      .then(() => {
        props.getReviews();
      })
      .catch((err) => console.log(err));
  };
  const reportReview = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_id}/report`, reviewBody, header)
      .then(() => {
        props.getReviews();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      *****
      <div>
        {dateAndUser}
      </div>
      <div> {props.review.summary} </div>
      <div> {props.review.body} </div>
      {form}
      <div>
        <span>
          Helpful?
          <div onClick={markAsHelpful}>Yes</div>
        </span>
        (
          {props.review.helpfulness}
        )
        |
        <div onClick={reportReview}>report</div>
      </div>
    </div>
  );
};

export default ReviewTile;
