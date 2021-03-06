import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Stars from '../Reviews/Ratings/Stars.jsx'
import { SocialIcon } from 'react-social-icons';

function ProductInformation({ product, selectedStyle, price, sale, avgRating }) {

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

  const renderSocialMediaIcons = () => {
    return <div className='social-media-links'>
      <SocialIcon style={{marginRight: 2, height: '2rem', width: '2rem'}} url="http://facebook.com" />
      <SocialIcon style={{marginRight: 2, height: '2rem', width: '2rem'}} url="http://twitter.com" />
      <SocialIcon style={{marginRight: 2, height: '2rem', width: '2rem'}} url="http://pinterest.com" />
    </div>
  }

  const scrollToReviews = () => {
    document.querySelector('.reviews-list').scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <div>
      {product.hasOwnProperty('id') ?
        <div className='product-info-side'>
          <div className='product-rating'>
            <Stars avgRating={avgRating} />
            <span id="reviews-link" onClick={() => scrollToReviews()}>Read all reviews</span>
          </div>
          <div className='product-category'>
            {product.category}
          </div>
          <div className='product-name'>
            {product.name}
          </div>
          <div className='product-price'>{renderPrice()}</div>
          {renderSocialMediaIcons()}
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;