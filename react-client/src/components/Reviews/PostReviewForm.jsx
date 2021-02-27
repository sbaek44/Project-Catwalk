import React from 'react';
import axios from 'axios';
import header from '../../../../config.js'

const ReviewForm = (props) => {
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
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="text" value="" />
      <input type="submit" />
    </form>
  )
};
