import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (props.currentProduct) {
      getReviews();
    }
  }, []);

  const getReviews = () => {
    let id = props.currentProduct;
    axios.get(`http://127.0.0.1:3000/api/reviews/?product_id=${id}&count=100&sort=${selectedParameter}`)
      .then((data) => {
        setReviews(data.data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {ratings[0].body}
    </div>
  );
};

export default Reviews;
