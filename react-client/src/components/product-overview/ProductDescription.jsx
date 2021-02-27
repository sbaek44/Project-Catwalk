import React, { useState, useEffect } from 'react';


function ProductDescription(props) {

  const { selectedProduct } = props;

  return (
    <div>
      {selectedProduct !== null ?
        <div style={{marginBottom: 10}}>
          <h4>{selectedProduct.slogan}</h4>
          {/* {console.log(selectedProduct)} */}
          <p>{selectedProduct.description}</p>
          <ul>
            <li>twitter</li>
            <li>facebook</li>
            <li>pinterest</li>
          </ul>
        </div>
        : null}
    </div >
  )

};

export default ProductDescription;