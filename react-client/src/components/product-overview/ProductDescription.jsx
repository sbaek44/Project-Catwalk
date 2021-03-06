import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

function ProductDescription({ product }) {

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
    if (product.hasOwnProperty('id')) {
      getAllProductInfo(product.id)
    }
  }, [product])

  const renderFeatures = () => {
    // sometimes there are duplicate features on one product (???)
    let uniqueFeatures = [];
    for (let feature of features) {
      if (!uniqueFeatures.includes(feature)) {
        uniqueFeatures.push(feature)
      }
    }
    return uniqueFeatures.map((feature, i) => {
      let valueWithoutQuotes = '';
      if (feature.value) {
        valueWithoutQuotes = feature.value.replace(/^"|"$/g, ''); // remove quotation marks from values (not all features have a value prop)
      }
      return <li key={i} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <span style={{ marginRight: 5 }}>✔ </span>
        <span style={{ marginRight: 5 }}>{`${feature.feature}`}</span>
        <span style={{ color: 'gray' }}>{valueWithoutQuotes}</span>
      </li>
    })
  }

  const addPeriodIfMissing = (str = null) => {
    if (str) {
      let lastChar = str.slice(-1);
      if (lastChar !== '.') {
        return '.'
      }
    }
  }

  return (
    <div>
      {product !== null ?
        <div className='product-info-bottom'>
          <div className='slogan-description-container'>
            <div className='product-slogan'>{product.slogan}{addPeriodIfMissing(product.slogan)}</div>
            <div className='product-description'>{product.description}{addPeriodIfMissing(product.description)}</div>
          </div>
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