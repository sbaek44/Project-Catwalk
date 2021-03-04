import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import ReviewPhotos from './ReviewPhotos.jsx';
import Stars from './Ratings/Stars.jsx';
import axios from 'axios';

const ReviewTile = ({ review, avgRating, getReviews }) => {
  const date = new Date(review.date).toUTCString().slice(4, -12);
  const [hasMarked, setHasMarked] = useState(false);
  const [longerThan250, setLongerThan250] = useState(false);

  useEffect(() => {
    if (review.body.length > 250) {
      setLongerThan250(true);
    }
  }, [review]);

  let reviewText;
  if (!longerThan250) {
    reviewText = <div> {review.body} </div>;
  } else {
    reviewText = (
      <div> {review.body.slice(0, 250)} <div style={{fontWeight: 'bold'}}  className="text"  onClick={() => setLongerThan250(false)} >show more..</div>  </div>
    );
  };


  // By default the first 250 characters of the review should display.  If the review is longer than 250 characters, below the body a link reading “Show more” will appear.  Upon clicking this link, the review tile should expand and the rest of the review should display.
  // create state that stores if review body string length is greater than 250 characters
  // if the lenght is longer than 250 characters, set flag to true
  // slice body length to the first 250 chars
  // display text below body saying "show more..."
  // onclick will set flag to false and stop displaying the button
  // will also set review body to the full length of the review body

  // Any images that were submitted as part of the review should appear as thumbnails below the review text. Upon clicking a thumbnail, the image should open in a modal window, displaying at full resolution.  The only functionality available within this modal should be the ability to close the window.


  let day = date.slice(0,3);
  let month = date.slice(-9, -6);
  let year = date.slice(-5);
  let dateAndUser = `${review.reviewer_name}, ${month} ${day}, ${year}`;
  let form;
  if (!review.recommend) {
    form = '';
  } else {
    form = <div>✔ I recommend this product</div>;
  }
  let response;
  if (review.response) {
    response = (<div id="response-container" >
      <div id="response" >
      Response from seller:
      </div>
      <div id="response-text">
        {review.response}
      </div>
    </div>)
  } else {
    response = '';
  }

  let reviewBody = {
    body: review.body,
    date: review.date,
    helpfulness: review.helpfulness,
    photos: review.photos,
    recommend: review.recommend,
    response: review.response,
    review_className: review.review_className,
    reviewer_name: review.reviewer_name,
    summary: review.summary,
  };

  const markAsHelpful = () => {
    if (!hasMarked) {
      reviewBody.helpfulness += 1;
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${review.review_id}/helpful`, reviewBody, header)
        .then(() => {
          getReviews();
        })
        .catch((err) => console.log(err));
      setHasMarked(true);
    }
  };

  const markAsUnHelpful = () => {
    if (!hasMarked) {
      reviewBody.helpfulness -= 1;
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${review.review_id}/helpful`, reviewBody, header)
        .then(() => {
          getReviews();
        })
        .catch((err) => console.log(err));
      setHasMarked(true);
    }
  };

  const reportReview = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${review.review_id}/report`, reviewBody, header)
      .then(() => {
        getReviews();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reviewTile">
      <div className="stars"> <Stars avgRating={avgRating} /></div>
      <div className="userName">
        {dateAndUser}
      </div>
      <div className="reviewSummary"> {review.summary} </div>
     {reviewText}
      <ReviewPhotos photos={review.photos} />
      {form}
      {response}
        <div style={{display: 'flex', flexDirection: 'row'}}>
            Helpful?
            <div  id="yes"  className="text" onClick={markAsHelpful}>Yes</div>
            {`(${review.helpfulness})`}
            <div id="yes" className="text" onClick={markAsUnHelpful} >No</div>
            {`(${review.helpfulness})`}
          <div id="yes">|</div>
        <div id="yes" className="text" onClick={reportReview}>report</div>
      </div>
    </div>
  );
};

export default ReviewTile;
