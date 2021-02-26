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

  const [styles, updateStyles] = useState([]); // will /get styles based on the currently selected product
  const [selectedStyle, selectStyle] = useState(0); // By default, the style selected will be the first in the list
  const [expandedGalleryView, toggleGalleryView] = useState(false); // Conditional render image gallery component based on this prop

  // bind methods to interact with styles, selectedStyle, gallery boolean

  const getStyles = (id) => {
    axios.get(`/products/${id}/styles`, header)
      .then((res) => {
        updateStyles(res.data)
          .then(() => {
            console.log(styles);
          });
      });
  };

  useEffect(() => {
    console.log('test');
    if (props.products.length) {
      console.log('test2');
      getStyles(props.products[props.selectedItemIndex].id)
    }
  })


  return (
    <div>
      <ImageGallery />
      <ProductInformation />
      <StyleSelector />
      <AddToCart />
      <div>other product info and social media buttons</div>
    </div>
  )

}




