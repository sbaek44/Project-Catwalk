import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import ReviewsList from './ReviewsList.jsx';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [amountOfReviews, addReviews] = useState(2);
  useEffect(() => {
    console.log(reviews);
    getReviews();
  }, [reviews]);

  const addMoreReviews = () => {
    addReviews(amountOfReviews + 2);
  };

  let getReviews = () => {
    let id = props.currentProduct.id || 16095;
    if (reviews.length === 0) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=100`, header)
        .then((data) => {
          setReviews(data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <ReviewsList reviews={reviews.results} amountOfReviews={amountOfReviews} />
     <span>
       <button onClick={addMoreReviews} >MORE REVIEWS</button>
       <button>ADD A REVIEW +</button>
     </span>
    </div>
  );
};

export default Reviews;
