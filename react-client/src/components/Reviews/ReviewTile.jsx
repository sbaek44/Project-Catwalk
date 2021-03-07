import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import ReviewPhotos from './ReviewPhotos.jsx';
import Stars from './Ratings/Stars.jsx';
import axios from 'axios';
import Highlighter from "react-highlight-words";


const ReviewTile = ({ searchQuery, characteristicsArr, metadata, review, avgRating, getReviews }) => {
  const date = new Date(review.date).toUTCString().slice(4, -12);
  const [hasMarked, setHasMarked] = useState(false);
  const [longerThan250, setLongerThan250] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);

  useEffect(() => {
    if (review.body.length > 250) {
      setLongerThan250(true);
    }
  }, [review]);
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsHighlighting(true);
    } else {
      setIsHighlighting(false);
    }
  }, [searchQuery])

  let reviewText;
  if (!longerThan250) {
    reviewText = <div> {review.body} </div>;
  } else {
    reviewText = (
      <div>
        {review.body.slice(0, 250)}
          <div style={{fontSize: '14px', fontWeight: 'bold'}}  className="text"  onClick={() => setLongerThan250(false)} >
            show more..
          </div>
      </div>
    );
  };

  let day = date.slice(0,3);
  let month = date.slice(-9, -6);
  let year = date.slice(-5);
  let dateAndUser = `${review.reviewer_name}, ${month} ${day}, ${year}`;
  let form;
  if (!review.recommend) {
    form = '';
  } else {
    form = <div className="reviewGuts" style={{fontWeight: 'bold'}}>✔ I recommend this product</div>;
  }
  let response;
  if (review.response) {
    response = (
    <div id="response-container" >
      <div id="response">
        Response from seller:
      </div>
      <div id="response-text">
        {review.response}
      </div>
    </div>
    )
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
      axios.put(`http://127.0.0.1:3000/api/reviews/${review.review_id}/helpful`, reviewBody)
        .then(() => {
          getReviews();
        })
        .catch((err) => console.log(err));
      setHasMarked(true);
    }
  };

  const reportReview = () => {
    axios.put(`http://127.0.0.1:3000/api/reviews/${review.review_id}/report`, reviewBody)
      .then(() => {
        getReviews();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reviewTile">
      <div id="stars-user" style={{display: 'flex', flexDirection: 'row'}} >
      <div className="stars"> <Stars avgRating={review.rating} /></div>
      <div className="userName">
        {dateAndUser}
      </div>
      </div>


      <div className="reviewSummary"> {review.summary} </div>
      <div className="reviewGuts" > {reviewText}  </div>
      <ReviewPhotos photos={review.photos} />
      {form}
      <div className="reviewGuts">{response}  </div>
        <div className="reviewGuts" style={{display: 'flex', flexDirection: 'row'}}>
          Helpful?
            <div  id="yes"  className="text" onClick={markAsHelpful}>Yes</div>
            {`(${review.helpfulness})`}
            <div id="yes" className="text" onClick={markAsHelpful} >No</div>
            {`(${review.helpfulness})`}
          <div id="yes">|</div>
        <div id="yes" className="text" onClick={reportReview}>report</div>
      </div>
      {isHighlighting
      ?     <Highlighter
      highlightClassName="found"
      searchWords={[searchQuery]}
      autoEscape={true}
      textToHighlight={review.body}
    />
    : ''
      }
    </div>
  );
};

export default ReviewTile;
