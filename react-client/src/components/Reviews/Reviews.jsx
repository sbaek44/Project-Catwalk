import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import SortForm from './SortForm.jsx';
import ReviewsList from './ReviewsList.jsx';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [amountOfReviews, addReviews] = useState(2);
  const [sortParameters] = useState(['relevance', 'newest', 'helpful']);
  const [selectedParameter, updateParam] = useState('relevance');
  const [isPosting, togglePosting] = useState(false);
  useEffect(() => {
    getReviews();
  }, [selectedParameter]);

  const addMoreReviews = () => {
    addReviews(amountOfReviews + 2);
  };

  const updateParamFunc = (e) => {
    updateParam(e.target.value);
  };

  let getReviews = () => {
    let id = props.currentProduct.id || 16092;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=100&sort=${selectedParameter}`, header)
      .then((data) => {
        setReviews(data.data);
      })
      .catch((err) => console.log(err));
  };
  let lengthOfReviews;
  if (!reviews.results) {
    lengthOfReviews = 0;
  } else {
    lengthOfReviews = reviews.results.length;
  }

  return (
    <div>
      <span>
        {lengthOfReviews}
        reviews, sorted by
        <SortForm updateParamFunc={updateParamFunc} sortParameters={sortParameters} />
      </span>
      <ReviewsList getReviews={getReviews} reviews={reviews.results} amountOfReviews={amountOfReviews} />
      <span>
         <button onClick={addMoreReviews} >MORE REVIEWS</button>
         <button>ADD A REVIEW +</button>
      </span>
    </div>
  );
};

export default Reviews;
