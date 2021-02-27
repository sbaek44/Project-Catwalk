import React from 'react';
import axios from 'axios';
import header from '../../../../config.js'

const PostReviewForm = (props) => {
  const submitReview = (e) => {
    e.preventDefault();
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax//reviews/${props.id}/report`, header)
      .then(() => {
        console.log('submitted a new review');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={submitReview}>
      <label> Overall rating
        <input type="text" name="" />
      </label>
      <label> Do you recommend this product?
        <input type="text" name="" />
      </label>
      <label> Characteristics
        <input type="text" name="" />
      </label>
      <label> Review summary
        <input type="text" name="" />
      </label>
      <label> Review body
        <input type="text" name="" />
      </label>
      <label> Upload your photos
        <input type="text" name="" />
      </label>
      <label> What is your nickname?
        <input type="text" name="" />
      </label>
      <label> Your email
        <input type="text" name="" />
      </label>
        <input type="submit" name="submit" />
    </form>
  )
};

export default PostReviewForm;
