import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation(props) {

  const { selectedProduct } = props;

  // product information to be displayed: rating, name, categroy, price from STYLE not PRODUCT

  return (
    <div>
      {selectedProduct !== null ?
        <div>
          <div>STAR RATING and LINK TO REVIEWS HERE</div>
          <div>Category: {selectedProduct.category}</div>
          <h4>TITLE: {selectedProduct.name}</h4>
          <div>PRICE: $$$$$</div>
          {/* free form text field and social media icons */}
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;