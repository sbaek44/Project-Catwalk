import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation(props) {

  const { selectedProduct, selectedStyle, price, sale } = props;

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
    <div className='product-info-side'>
      {selectedProduct !== null ?
        <div>
          <div className='product-rating'>
            <span>*****</span>
            <span>read all reviews</span>
          </div>
          <div className='product-category'>
            <p>{selectedProduct.category}</p>
          </div>
          <div className='product-name'>
            <p style={{fontSize: 20, fontWeight: 'bold'}}>    {selectedProduct.name}
            </p>
          </div>
          <div className='product-price'>{renderPrice()}</div>
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;