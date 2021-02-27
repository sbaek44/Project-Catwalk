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

  return (
    <div>
      <ImageGallery selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} />
      <ProductInformation selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} price={price} sale={sale} />
      <StyleSelector selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} selectStyle={selectStyle} updatePrice={updatePrice} updateSale={updateSale}/>
      <ProductDescription selectedProduct={props.products[props.selectedItemIndex] || null} />
    </div>
  )

}




