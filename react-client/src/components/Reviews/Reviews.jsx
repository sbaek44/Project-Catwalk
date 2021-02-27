import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import ReviewsList from './ReviewsList.jsx';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // console.log(reviews);
    getReviews();
  }, [reviews]);

  let getReviews = () => {
    let id = props.currentProduct.id || 16095;
    if (reviews.length === 0) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=100`, header)
      .then((data) => {
        setReviews(data.data);
      })
    }
  };

  return (
    <div>
      <ReviewsList reviews={reviews.results} />
    </div>
  )
}

export default Reviews;