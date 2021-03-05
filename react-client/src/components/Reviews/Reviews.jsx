import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import SortForm from './SortForm.jsx';
import ReviewsList from './ReviewsList.jsx';
import PostReviewForm from './PostReviewForm.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Search from './Search.jsx';
import Modal from 'react-modal';

const Reviews = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [amountOfReviews, addReviews] = useState(2);
  const [sortParameters] = useState(['relevance', 'newest', 'helpful']);
  const [selectedParameter, updateParam] = useState('relevance');
  const [isPosting, togglePosting] = useState(false);
  const [isDisplayingMoreReviewsButton, setIsdisplayingMoreReviewsButton] = useState(false);
  useEffect(() => {
    if (props.currentProduct) {
      getReviews();
    }
    updateMoreReviewsButton(reviews);
  }, [selectedParameter, amountOfReviews, props.currentProduct, filters]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchReviews(searchQuery);
    }
  }, [searchQuery]);

  const togglePostModalIsOpen = () => {
    setPostModalIsOpen(!postModalIsOpen);
  };

  const addFilters = (filterToAdd) => {
    let updatedFilters = filters.map((element) => element);
    updatedFilters.push(filterToAdd);
    setFilters(updatedFilters);
  };
  const removeFilters = (filterToRemove) => {
    let updatedFilters = [];
    filters.map((element) => {
      if (element !== filterToRemove) {
        updatedFilters.push(element);
      }
    });
    setFilters(updatedFilters);
  };

  const manipulateFilters = (filter) => {
    if (filters.includes(filter)) {
      removeFilters(filter);
    } else {
      addFilters(filter);
    }
  };

  const filterReviews = (untouchedReviews) => {
    let filteredReviews = [];
    untouchedReviews.filter((review) => {
      if (filters.includes(review.rating)) {
        filteredReviews.push(review);
      }
    });
    if (filteredReviews.length === 0) {
      return;
    }
    setReviews(filteredReviews);
  };

  const addMoreReviews = () => {
    addReviews(amountOfReviews + 2);
  };

  const updateParamFunc = (e) => {
    updateParam(e.target.value);
  };

  const getReviews = () => {
    let id = props.currentProduct;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=100&sort=${selectedParameter}`, header)
      .then((data) => {
        setReviews(data.data.results);
        updateMoreReviewsButton(data.data.results);
        filterReviews(data.data.results);
        props.getRatings();
      })
      .catch((err) => console.log(err));
  };

  const searchReviews = (input) => {
    let searchReviews = [];
    reviews.filter((review) => {
      if (review.body.includes(input) || review.summary.includes(input)) {
        searchReviews.push(review);
      }
    });
    //setReviews(searchReviews);
    console.log(searchReviews);
  };

  let lengthOfReviews;
  if (!reviews) {
    lengthOfReviews = 0;
  } else {
    lengthOfReviews = reviews.length;
  }

  let moreReviewsButton;
  if (!isDisplayingMoreReviewsButton) {
    moreReviewsButton = '';
  } else {
    moreReviewsButton = <button className="review-buttons" onClick={addMoreReviews} >MORE REVIEWS</button>;
  }

  const updateMoreReviewsButton = (arrOfReviews) => {
    if (arrOfReviews.length > 2) {
      setIsdisplayingMoreReviewsButton(true);
    }
    if (amountOfReviews >= arrOfReviews.length) {
      setIsdisplayingMoreReviewsButton(false);
    }
  };

  const togglePostForm = () => {
    togglePosting(!isPosting);
  };

  let postForm;
  if (!isPosting) {
    postForm = '';
  } else {
    postForm = <PostReviewForm getReviews={getReviews} review_id={props.currentProduct} />;
  }

  let filterDisplay;
  if (filters.length > 1) {
    let filterString = 'Now displaying items with ';
    filters.forEach((e => filterString += ` ${e} star,`));
    filterString = filterString.slice(0, -1);
    filterString += ' ratings.';
    filterDisplay = (
      <div>{filterString}
        <button onClick={() => { setFilters([]) }} >REMOVE ALL FILTERS</button>
      </div>
    );
  } else {
    filterDisplay = '';
  }

  return (
    <div className="ratings-reviews">
      {postForm}
        <div className="ratings">
          <Ratings
            manipulateFilters={manipulateFilters}
            avgRating={props.avgRating}
            metadata={props.metadata}/>
        </div>
      <div>

        <div className="reviews" >
          <div className="sort-bar">
            {`${lengthOfReviews} reviews, sorted by`}
            <SortForm updateParamFunc={updateParamFunc} sortParameters={sortParameters} />
            {filterDisplay}
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchReviews={searchReviews}
            />
          </div>
          <ReviewsList avgRating={props.avgRating}
            getReviews={getReviews}
            reviews={reviews}
            amountOfReviews={amountOfReviews}
          />
          <div className="more-reviews-bar">
            {moreReviewsButton}
            <button className="review-buttons" onClick={togglePostForm} >ADD A REVIEW +</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
