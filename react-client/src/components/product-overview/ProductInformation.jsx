import React, { useState, useEffect, useRef } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation({selectedProduct, selectedStyle, price, sale, avgRating}) {

  // todo: star rating

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
            <span>Rating: {avgRating} </span>
            <span id="reviews-link" style={{textDecoration: 'underline'}} onClick={() => scrollToReviews()}>Read all reviews</span>
          </div>
          <div className='product-category'>
            CATEGORY > {selectedProduct.category.toUpperCase()}
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