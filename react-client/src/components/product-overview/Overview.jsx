import React, { useState, useEffect } from 'react';
import header from '../../../../config.js';
import axios from 'axios';
import ProductInformation from './ProductInformation.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';



export default function Overview(props) {

  // already has products array and selected product index as props
  // 1. can pass that to product information component to display
  // 2. track styles + selected style in here then pass it as props
  // // since info, selector and add to cart all read from it
  // 3. track whether image gallery view is expanded or default in here for now
  // // may be good to make an imageGalleryContainer component instead if this gets to be too much

  const [selectedStyle, selectStyle] = useState(0);
  const [price, updatePrice] = useState(0);
  const [sale, updateSale] = useState(null);
  const [expandedGalleryView, toggleGalleryView] = useState(false); // Conditional render image gallery component based on this prop

  return (
    <div>
      {/* <ImageGallery /> */}
      <ProductInformation selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} price={price} sale={sale} />
      <StyleSelector selectedProduct={props.products[props.selectedItemIndex] || null} selectedStyle={selectedStyle} selectStyle={selectStyle} updatePrice={updatePrice} updateSale={updateSale}/>
      {/* <div>other product info and social media buttons</div> */}
    </div>
  )

}




