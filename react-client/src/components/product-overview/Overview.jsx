import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';



export default function Overview(props) {

  // in App, use product page 1 and selectedItemIndex 2 to demo Overview component where there are actually many styles/images; a lot of them only have one image per style
  const {products, selectedItemIndex, avgRating} = props;

  const [selectedStyle, selectStyle] = useState(0);
  const [price, updatePrice] = useState(0);
  const [sale, updateSale] = useState(null);
  const [photos, updatePhotos] = useState([]);
  const [selectedPhoto, selectPhoto] = useState('');

  return (
    <div className='overview'>
      <ImageGallery selectedPhoto={selectedPhoto} selectPhoto={selectPhoto} photos={photos} />
      <div className='right-side'>
        <ProductInformation selectedProduct={products[selectedItemIndex] || null} selectedStyle={selectedStyle} price={price} sale={sale} avgRating={avgRating} />
        <StyleSelector selectedProduct={products[selectedItemIndex] || null} selectedStyle={selectedStyle} selectStyle={selectStyle} updatePrice={updatePrice} updateSale={updateSale} selectPhoto={selectPhoto} updatePhotos={updatePhotos} />
      </div>
      <ProductDescription selectedProduct={products[selectedItemIndex] || null} />
    </div>
  )

}




