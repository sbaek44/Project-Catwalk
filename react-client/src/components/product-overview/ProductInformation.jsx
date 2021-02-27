import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation(props) {

  const { selectedProduct, selectedStyle, price, sale } = props;

  // product information to be displayed: rating, name, categroy, price
  // price comes from selected STYLE not PRODUCT - done

  // todo: star rating
  // todo: when sale is not null, display sale inline next to price and strikethrough the text of the original price
  // todo: free form text field (for .slogan) & social media icons, probably best in a seperate component since it's below img gallery on the mock

  return (
    <div>
      {selectedProduct !== null ?
        <div>
          <div>***</div>
          <div>Category: {selectedProduct.category}</div>
          <h4>TITLE: {selectedProduct.name}</h4>
          <div>PRICE: {price}</div>
          <div>SALE: {sale}</div>
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;