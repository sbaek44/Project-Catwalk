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

  let options = ["1 star - “Poor”", "2 stars - “Fair”", "3 stars - “Average”", "4 stars - “Good”", "5 stars - “Great”"];

  return (
    <form  className="addReviewForm" onSubmit={submitReview}>
      <label>
        Overall rating
        <select onChange={(e) => setRating(e.target.value)}>
          {options.map((option, i) => (
            <option value={i + 1} key={i}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Do you recommend this product?
        <select onChange={(e) => setRecommend(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <label>
        Characteristics
        <input onChange={(e) => setCharacteristics(e.target.value)} type="text" name="" />
      </label>
      <label>
        Review summary
        <input placeholder="Example: Best purchase ever!" onChange={(e) => setSummary(e.target.value)} type="text" name="" />
      </label>
      <label>
        Review body
        <input onChange={(e) => setBody(e.target.value)} type="text" name="" />
      </label>
      <label>
        Upload your photos
        <button>Upload photos</button>
      </label>
      <label>
        What is your nickname?
        <input placeholder="Example: jackson11!" onChange={(e) => setName} type="text" name="" />
        For privacy reasons, do not use your full name or email address” will appear.
      </label>
      <label>
        Your email
        <input placeholder="Example: jackson11@email.com"  onChange={(e) => setEmail(e.target.value)} type="text" name="" />
        For authentication reasons, you will not be emailed” will appear.
      </label>
      <input
        type="submit"
        name="submit"/>
    </form>
  );
};

export default PostReviewForm;
