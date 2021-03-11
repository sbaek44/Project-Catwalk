/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect} from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import ProductInformation from './ProductInformation.jsx';
// import ProductDescription from './ProductDescription.jsx';
// import ImageGallery from './ImageGallery.jsx';
// import StyleSelector from './StyleSelector.jsx';
// import Banner from './Banner.jsx';


function Overview({

}) {

  const [product, setProduct] = useState(0)

  const fetch = () => {
    axios.get(`/api/shared/products/`)
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <p>{product ? product.name : 'waiting'}</p>
      <p>{product ? product.slogan : 'waiting'}</p>
    </div>
  );
}

export default Overview;
