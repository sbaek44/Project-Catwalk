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

  const getStyles = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, header)
      .then((res) => {
        updateStyles(res.data);
      });
  };

  useEffect(() => {
    if (props.products.length) {
      getStyles(props.products[props.selectedItemIndex].id)
    }
  }, [props.products])

  return (
    <div>
      {/* <ImageGallery /> */}
      <ProductInformation selectedProduct={props.products[props.selectedItemIndex] || null} />
      <StyleSelector styles={styles} selectedStyle={selectedStyle} selectStyle={selectStyle} />
      {/* styleselector can map over prop styles for options, onClick each will selectStyle with their index from that array (2nd map argument), render the checkmark and any other visuals as needed when selectedStyle matches its own index}*/}
      {/* <AddToCart />
      <div>other product info and social media buttons</div> */}
    </div>
  )

}




