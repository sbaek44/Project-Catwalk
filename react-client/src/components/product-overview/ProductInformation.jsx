import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation(props) {

  const { selectedProduct, selectedStyle, price, sale, avgRating } = props;

  // todo: star rating

  // The price may be on sale.  If the SKU is currently discounted, then the sale price should appear in red, followed by the original price which is struckthrough.

  const renderPrice = () => {
    if (sale) {
      return <span>
        <span style={{ color: 'red' }}>${sale} </span>
        <span style={{ textDecoration: 'line-through' }}> {price}</span>
      </span>
    } else {
      return <span>${price}</span>
    }
  }


  return (
    <div>
      {selectedProduct !== null ?
        <div className='product-info-side'>
          <div className='product-rating'>
            <span style={{marginRight: 5}}>average rating: {avgRating}</span>
            <span style={{textDecoration: 'underline'}}>read all reviews</span>
          </div>
          <div className='product-category'>
            {selectedProduct.category}
          </div>
          <div className='product-name' style={{fontSize: 24, fontWeight: 'bold'}}>
           {selectedProduct.name}
          </div>
          <div className='product-price'>{renderPrice()}</div>
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;