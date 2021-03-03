import React, { useState } from 'react';
import header from '../../../../config.js';
import ReviewPhotos from './ReviewPhotos.jsx';
import Stars from './Ratings/Stars.jsx';
import axios from 'axios';

const ReviewTile = (props) => {
  const date = new Date(props.review.date).toUTCString().slice(4, -12);
  const [hasMarked, setHasMarked] = useState(false);
  let day = date.slice(0,3);
  let month = date.slice(-9, -6);
  let year = date.slice(-5);
  let dateAndUser = `${props.review.reviewer_name}, ${month} ${day}, ${year}`;
  let form;
  if (!props.review.recommend) {
    form = '';
  } else {
    form = <div>✔ I recommend this product</div>;
  }
  let response;
  if (props.review.response) {
    response = (<div id="response-container" >
      <div id="response" >
      Response:
      </div>
      <div id="response-text">
        {props.review.response}
      </div>
    </div>)
  } else {
    response = '';
  }

  let reviewBody = {
    body: props.review.body,
    date: props.review.date,
    helpfulness: props.review.helpfulness,
    photos: props.review.photos,
    recommend: props.review.recommend,
    response: props.review.response,
    review_className: props.review.review_className,
    reviewer_name: props.review.reviewer_name,
    summary: props.review.summary,
  };

  const markAsHelpful = () => {
    if (!hasMarked) {
      reviewBody.helpfulness += 1;
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_id}/helpful`, reviewBody, header)
        .then(() => {
          props.getReviews();
        })
        .catch((err) => console.log(err));
      setHasMarked(true);
    }
  };

  const markAsUnHelpful = () => {
    if (!hasMarked) {
      reviewBody.helpfulness -= 1;
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_className}/helpful`, reviewBody, header)
        .then(() => {
          props.getReviews();
        })
        .catch((err) => console.log(err));
      setHasMarked(true);
    }
  };

  const reportReview = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${props.review.review_className}/report`, reviewBody, header)
      .then(() => {
        props.getReviews();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reviewTile">
      <div className="stars"> <Stars avgRating={props.avgRating} /></div>
      <div className="userName">
        {dateAndUser}
      </div>
      <div className="reviewSummary"> {props.review.summary} </div>
      <div> {props.review.body} </div>
      <ReviewPhotos photos={props.review.photos} />
      {form}
      {response}
        <div style={{display: 'flex', flexDirection: 'row'}}>
            Helpful?
            <div  id="yes"  className="text" onClick={markAsHelpful}>Yes</div>
            {`(${props.review.helpfulness})`}
            <div id="yes" className="text" onClick={markAsUnHelpful} >No</div>
            {`(${props.review.helpfulness})`}
          <div id="yes">|</div>
        <div id="yes" className="text" onClick={reportReview}>report</div>
      </div>
    </div>
  );
};

export default ReviewTile;
