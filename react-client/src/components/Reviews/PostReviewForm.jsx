import React, { useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js'

const PostReviewForm = (props) => {
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([])
  const [characteristics, setCharacteristics] = useState({});

  let reviewPost = {
    product_id: props.review_id,
    rating: rating,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: photos,
    characteristics: characteristics,
  };

  const submitReview = (e) => {
    e.preventDefault();
    console.log(reviewPost);
    // axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax//reviews/${props.id}/report`, reviewPost, header)
    //   .then(() => {
    //     console.log('submitted a new review');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <form  className="addReviewForm" onSubmit={submitReview}>
      <label>
        Overall rating
        <input onChange={(e) => setRating(e.target.value)} type="text" name="" />
      </label>
      <label>
        Do you recommend this product?
        <input onChange={(e) => setRecommend(e.target.value)} type="text" name="" />
      </label>
      <label>
        Characteristics
        <input onChange={(e) => setCharacteristics(e.target.value)} type="text" name="" />
      </label>
      <label>
        Review summary
        <input onChange={(e) => setSummary(e.target.value)} type="text" name="" />
      </label>
      <label>
        Review body
        <input onChange={(e) => setBody(e.target.value)} type="text" name="" />
      </label>
      <label>
        Upload your photos
        <input onChange={(e) => setPhotos(e.target.value)} type="text" name="" />
      </label>
      <label>
        What is your nickname?
        <input onChange={(e) => setName} type="text" name="" />
      </label>
      <label>
        Your email
        <input onChange={(e) => setEmail(e.target.value)} type="text" name="" />
      </label>
      <input
        type="submit"
        name="submit"/>
    </form>
  );
};

export default PostReviewForm;
