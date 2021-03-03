import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

function ProductDescription({ selectedProduct }) {

  const [features, changeFeatures] = useState([]);

  const getAllProductInfo = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, header)
      .then((res) => {
        changeFeatures(res.data.features);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    if (selectedProduct !== null) {
      getAllProductInfo(selectedProduct.id)
    }
  }, [selectedProduct])

  const renderFeatures = () => {
    // sometimes there are duplicate features on one product, should add logic to remove them before mapping
    return features.map((feature, i) => {
      return <li key={i}>
        <span>✔</span>
        <span>{` ${feature.feature} `}</span>
        <span>{feature.value}</span>
      </li>
    })
  }


  return (
    <div>
      {selectedProduct !== null ?
        <div className='product-info-bottom'>
          <div className='slogan-description-container'>
            <div className='product-slogan'>{selectedProduct.slogan}</div>
            <div className='product-description'>{selectedProduct.description}</div>
          </div>
          {/* todo - mock shows a horizontal line seperating the description/slogan and feature list */}
          {features.length ?
            <ul className='feature-list'>
              {renderFeatures()}
            </ul>
            : null}
        </div>
        : null}
    </div >
  )

};

export default ProductDescription;