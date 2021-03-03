import React, { useState, useEffect, useRef } from 'react';
import header from '../../../../config.js';
import axios from 'axios';
import Stars from '../Reviews/Ratings/Stars.jsx'

function ProductInformation({ selectedProduct, selectedStyle, price, sale, avgRating }) {

  const renderPrice = () => {
    if (sale) {
      return <span>
        <span className='price' style={{ color: 'red' }}>${sale} </span>
        <span className='price' style={{ textDecoration: 'line-through' }}> {price}</span>
      </span>
    } else {
      return <span className='price'>${price}</span>
    }
  }

  // social media buttons wil go on either this component, style selector, or product description - not sure yet

  const scrollToReviews = () => {
    document.querySelector('.reviews-list').scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <div>
      {selectedProduct !== null ?
        <div className='product-info-side'>
          <div className='product-rating'>
            <span id="reviews-link" onClick={() => scrollToReviews()}>Read all reviews</span>
            <Stars avgRating={avgRating} />
          </div>
          <div className='product-category'>
            {selectedProduct.category.toUpperCase()}
          </div>
          <div className='product-name'>
            {selectedProduct.name}
          </div>
          <div className='product-price'>{renderPrice()}</div>
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;