import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewsList = (props) => {
  if (!props.reviews) {
    return <div></div>
  }
  return (
    <div>
      { props.reviews.map((review) => {
        return <ReviewTile review={review} />
      }) }
    </div>
  )
}

export default ReviewsList;
