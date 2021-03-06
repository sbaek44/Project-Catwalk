import React, { useState, useEffect, useRef } from 'react';
import header from '../../../../config.js';
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
      <SocialIcon style={{marginLeft: 2, height: 25, width: 25}} url="http://pinterest.com" />
      <SocialIcon style={{marginLeft: 2, height: 25, width: 25}} url="http://facebook.com" />
      <SocialIcon style={{marginLeft: 2, height: 25, width: 25}} url="http://twitter.com" />
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
            <span id="reviews-link" onClick={() => scrollToReviews()}>Read all reviews</span>
            <Stars avgRating={avgRating} />
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