import React from 'react';

const ReviewTile = (props) => {
  const date = new Date(props.review.date).toUTCString().slice(0, -12);
  let form;
  if (!props.review.recommend) {
    form = '';
  } else {
    form = <div>I recommend this product</div>;
  }

  return (
    <div>
      *****
      <div> {props.review.reviewer_name}, {date} </div>
      <div> {props.review.summary} </div>
      <div> {props.review.body} </div>
      {form}
      <div> Was this review helpful? ({props.review.helpfulness}) | report </div>
    </div>
  );
};

export default ReviewTile;
