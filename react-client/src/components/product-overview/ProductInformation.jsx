import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';

function ProductInformation(props) {

  const { selectedProduct, selectedStyle, price, sale } = props;

  // todo: star rating

  // The price may be on sale.  If the SKU is currently discounted, then the sale price should appear in red, followed by the original price which is struckthrough.

  const renderPrice = () => {
    if (sale) {
      return <div>
        <span style={{color: 'red'}}>${sale} </span>
        <span style={{textDecoration: 'line-through'}}> {price}</span>
      </div>
    } else {
      return <span>${price}</span>
    }
  }


  return (
    <div>
      {selectedProduct !== null ?
        <div>
          <h4>Product Name: {selectedProduct.name}</h4>
          <div>Category: {selectedProduct.category}</div>
          <div>*****</div>
          {renderPrice()}
        </div>
        : null}
    </div >
  )

};

export default ProductInformation;