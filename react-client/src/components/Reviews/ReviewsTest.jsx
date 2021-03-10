import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
      getReviews();
  }, []);

  let reviewBody;
  if (reviews.length > 0) {
    reviewBody = reviews[0].body
  } else {
    reviewBody = '';
  }

  const getReviews = () => {
    axios.get(`/api/reviews/`)
      .then((data) => {
        setReviews(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {reviewBody}
    </div>
  );
};

export default Reviews;
