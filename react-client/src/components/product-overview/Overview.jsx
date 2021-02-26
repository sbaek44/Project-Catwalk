import React from 'react';
import axios from 'axios';
// import the other components

export default class Overview extends React.Component {

  // already has products array and selected product index as props
  // 1. can pass that to product information component to display
  // 2. track styles + selected style in here then pass it as props, since info, selector and add to cart all read from it
  // 3. track whether image gallery view is expanded or default in here for now; may be good to make an imageGalleryContainer component instead if this gets to be too much

  constructor(props) {
    super(props) {
      this.state = {
        styles: [], // will /get styles based on the currently selected product
        selectedStyle: 0, // By default, the style selected will be the first in the list
        expandedGalleryView: false, // Conditional render the image gallery component based on this prop
      }
    }
    // bind methods to interact with styles, selectedStyle, gallery boolean
  }



  render() {
    return (
      <div>
        contains the other components
      </div>
    )
  }
}