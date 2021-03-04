import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js'
import Modal from 'react-modal';

const PostReviewForm = (props) => {
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [summaryLengthisValid, setSummaryLengthIsValid] = useState(false);
  const [bodyIsValidLength, setBodyIsValidLength] = useState(false);
  const [reviewIsValid, setReviewIsValid] = useState(false);

  useEffect(() => {
    checkSummaryLength();
    CheckBodyLength();
  }, [summary, body]);

  let images = [];
  const setImages = (e) => {
    let idx = Number(e.target.name);
    images[idx] = e.target.value;
    console.log(images);
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setImageModalIsOpen(!imageModalIsOpen);
  };
  const updateImages = (e) => {
    toggleModal(e);
    setPhotos(images);
  };

  let belowBody;
  if (body.length < 50) {
    let amountLeft = 50 - body.length;
    belowBody = (
      <div>
        Minimum required characters left:
        {amountLeft}
      </div>
    );
  } else {
    belowBody = <div>Minimum reached</div>;
  }

  let reviewPost = {
    product_id: props.review_id,
    rating: rating,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: photos,
    characteristics: {},
  };

  const checkSummaryLength = () => {
    if (summary.length > 1 && summary.length < 61) {
      setSummaryLengthIsValid(true);
      return true;
    }
    return false;
  };
  const CheckBodyLength = () => {
    if (body.length > 50 && body.length < 1000) {
      return true;
      setBodyIsValidLength(true);
    }
    return false;
  };

  const setCharacteristic = (key, value) => {
    reviewPost.characteristics[key] = value;
  };

  const setBool = (bool) => {
    if (bool === 'true') {
      setRecommend(true);
    } else {
      setRecommend(false);
    }
  }

  const submitReview = (e) => {
    console.log(typeof reviewPost.recommend)
    let content = "Content-Type"
    header.headers[content] = 'application/json';
    e.preventDefault();
    if (reviewPost.rating < 1) {
      alert(`You must enter the following: Rating`);
    } else if (!checkSummaryLength()) {
      alert(`You must enter the following: Summary`);
    } else if (typeof reviewPost.recommend !== 'boolean') {
      alert(`You must enter the following: recommend`);
    } else if (!CheckBodyLength()) {
      alert(`You must enter the following: Body`);
    } else if (reviewPost.name === '') {
      console.log('name')
      alert(`You must enter the following: Name`);
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(reviewPost.email)) {
      alert(`You must enter the following: Email`);
    } else {
      console.log(reviewPost)
      reviewPost = JSON.stringify(reviewPost);
      setPostModalIsOpen(!postModalIsOpen)
      axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/`, reviewPost, header)
        .then((data) => {
          console.log('submitted a new review', data);
          props.getReviews();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const options = ['Select Rating', "1 star - “Poor”", "2 stars - “Fair”", "3 stars - “Average”", "4 stars - “Good”", "5 stars - “Great”"];
  const size = ["Size", "1 - A size too small", "2 - ½ a size too small", "3 - Perfect", "4 - ½ a size too big", "5 - A size too wide"];
  const width = ['Width', '1 - Too narrow', '2 - Slightly narrow', '3 - Perfect', '4 - Slightly wide', '5 - Too wide'];
  const comfort = ['Comfort', '1 - Uncomfortable', '2 - Slightly uncomfortable', '3 - Ok', '4 - Comfortable', '5 - Perfect'];
  const quality = ['Quality', '1 - Poor', '2 - Below average', '3 - What I expected', '4 - Pretty great', '5 - Perfect'];
  const length = ['Length', '1 - Runs Short', '2 - Runs slightly short', '3 - Perfect', '4 - Runs slightly long', '5 - Runs long'];
  const fit = ['Fit', '1 - Runs tight', '2 - Runs slightly tight', '3 - Perfect', '4 - Runs slightly long', '5 - Runs long'];

  return (
    <Modal isOpen={postModalIsOpen} >
      <Modal isOpen={imageModalIsOpen}>
        <div className="review-form-component" >
          <label>
            Image 1:
            <input style={{margin: '1%'}} onChange={setImages} name="0" type="text" />
          </label>
        </div>
        <div className="review-form-component">
          <label>
            Image 2:
            <input style={{margin: '1%'}} onChange={setImages} name="1" type="text" />
          </label>
        </div>
        <div className="review-form-component">
            <label>
              Image 3:
              <input style={{margin: '1%'}} onChange={setImages} name="2" type="text" />
          </label>
        </div>
        <div className="review-form-component">
          <label>
            Image 4:
            <input style={{margin: '1%'}} onChange={setImages} name="3" type="text" />
          </label>
        </div>
        <div className="review-form-component">
          <label>
            Image 5:
            <input style={{margin: '1%'}} onChange={setImages} name="4" type="text" />
        </label>
        </div>
      <button onClick={updateImages} >Submit</button>
      <button onClick={toggleModal} >Cancel</button>
    </Modal>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <form className="addReviewForm">
          <div className="review-form-component">
            <label>
              Overall rating
              <select style={{margin: '1%'}} onChange={(e) => setRating(Number(e.target.value))}>
                {options.map((option, i) => (
                  <option value={i} key={i}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Do you recommend this product?
              <select style={{margin: '1%'}} onChange={(e) => setBool(e.target.value)}>
                <option>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
          <div className="review-form-component" style={{display: 'flex', flexDirection: 'row'}}>
          <label>
            Characteristics:
            <select style={{margin: '1%'}} name="size" onChange={(e) => setCharacteristic(e.target.name, e.target.value)}>
              {size.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="width">
              {width.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="comfort">
              {comfort.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="quality">
              {quality.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="length">
              {length.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="select">
              {fit.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
          </label>
          </div>
          <div className="review-form-component">
            <label>
              Review summary:
              <input style={{margin: '1%'}} placeholder="Example: Best purchase ever!" onChange={(e) => setSummary(e.target.value)} type="text" name="" />
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Review body:
              <input style={{margin: '1%', width: '100%'}} placeholder="Why did you like the product or not?"  onChange={(e) => setBody(e.target.value)} type="text" name="" />
              {belowBody}
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Upload your photos:
              <button onClick={toggleModal}>Upload photos</button>
            </label>
          </div>
          <div className="review-form-component">
            <label>
              What is your nickname?:
              <input style={{margin: '1%'}} placeholder="Example: jackson11!" onChange={(e) => setName(e.target.value)} type="text" name="" />
              For privacy reasons, do not use your full name or email address” will appear.
            </label>
         </div>
        <div id="text-under-form" className="review-form-component">
            <label>
              Your email:
              <input style={{margin: '1%'}} placeholder="Example: jackson11@email.com"  onChange={(e) => setEmail(e.target.value)} type="email" name="" />
              For authentication reasons, you will not be emailed” will appear.
            </label>
        </div>
          <button onClick={submitReview}>Submit</button>
            <button onClick={() => setPostModalIsOpen(!postModalIsOpen)} >Cancel</button>
        </form>
      </div>
    </Modal>

  );
};

export default PostReviewForm;
