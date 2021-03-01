import React, { useState, useEffect } from 'react';


function ProductDescription(props) {

  const { selectedProduct } = props;

  // think i saw that some products have a 'features' property, those should go on here where the checkmarks are in mock (bottom-right)

  return (
    <div>
      {selectedProduct !== null ?
        <div className='product-info-bottom'>
          <div className='product-slogan'>{selectedProduct.slogan}</div>
          <div className='product-description'>{selectedProduct.description}</div>
        </div>
        : null}
    </div >
  )

};

export default ProductDescription;