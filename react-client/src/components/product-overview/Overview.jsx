import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';



export default function Overview(props) {

  // use product page 1 selectedItemIndex 9 (shoes) to demo image gallery arrows (which only appear when there's more than 7 thumbnails)

  const {products, selectedItemIndex, avgRating} = props;

  const [selectedStyle, selectStyle] = useState(0);
  const [price, updatePrice] = useState(0);
  const [sale, updateSale] = useState(null);
  const [photos, updatePhotos] = useState([]);
  const [selectedPhoto, selectPhoto] = useState('');

  return (
    <div className='overview'>
      <ImageGallery selectedPhoto={selectedPhoto} selectPhoto={selectPhoto} photos={photos} selectedProduct={products[selectedItemIndex] || null} />
      <div className='right-side'>
        <ProductInformation selectedProduct={products[selectedItemIndex] || null} selectedStyle={selectedStyle} price={price} sale={sale} avgRating={avgRating} />
        <StyleSelector selectedProduct={products[selectedItemIndex] || null} selectedStyle={selectedStyle} selectStyle={selectStyle} updatePrice={updatePrice} updateSale={updateSale} selectPhoto={selectPhoto} updatePhotos={updatePhotos} />
      </div>
      <ProductDescription selectedProduct={products[selectedItemIndex] || null} />
    </div>
  )

}




