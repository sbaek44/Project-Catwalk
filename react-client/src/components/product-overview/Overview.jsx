import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';



export default function Overview(props) {

  const [selectedStyle, selectStyle] = useState(0);
  const [price, updatePrice] = useState(0);
  const [sale, updateSale] = useState(null);
  const [photos, updatePhotos] = useState([]);
  const [selectedPhoto, selectPhoto] = useState('');

  return (
    <div className='overview'>
      <ImageGallery selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} selectedPhoto={selectedPhoto} photos={photos} />
      <div className='right-side'>
        <ProductInformation selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} price={price} sale={sale} />
        <StyleSelector selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} selectStyle={selectStyle} updatePrice={updatePrice} updateSale={updateSale} selectPhoto={selectPhoto} updatePhotos={updatePhotos} />
      </div>

      <ProductDescription selectedProduct={props.products[props.selectedItemIndex] || null} />
    </div>
  )

}




