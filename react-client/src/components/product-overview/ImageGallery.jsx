import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import header from '../../../../config.js';

export default function ImageGallery(props) {

  const { selectPhoto, photos } = props;

  // By default, the first image in the set will be displayed as the main image
  // When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style

  const [selectedPhotoIndex, changePhotoIndex] = useState(0);
  const [expandedGalleryView, toggleGalleryView] = useState(false); // Conditional render image gallery based on this

  // The largest piece of the Overview module will be a photo gallery showing images of the product.  The photos presented in this gallery will be specific to the currently selected product style.  Each time a new style is chosen, the gallery will update to show photos corresponding to the new style.   Each style will have a set of images associated with it.  The gallery will allow customers to browse between and zoom in on these photos.
  // The gallery will be viewable in two states.  A default collapsed view, and an expanded view.


  const handleSelect = (url, idx) => {
    selectPhoto(url);
    changePhotoIndex(idx);
  }

  const scrollForward = () => {
    if (selectedPhotoIndex === photos.length - 1) {
      changePhotoIndex(0)
    } else {
      let nextIndex = selectedPhotoIndex + 1;
      changePhotoIndex(nextIndex)
    }
  }

  const scrollBack = () => {
    if (selectedPhotoIndex === 0) {
      changePhotoIndex(photos.length - 1)
    } else {
      let nextIndex = selectedPhotoIndex - 1;
      changePhotoIndex(nextIndex)
    }
  }

  return (
    <div className='image-gallery-outer'>
      {photos.length ?
        <div className='image-gallery'>
          <div className='gallery-thumbnails-container'>
            <button onClick={() => scrollBack()}>↑</button>
            <div className='gallery-thumbnails'>
              {photos.map((photo, i) => {
                return <img
                  className='image-thumbnail'
                  key={i}
                  src={photo.thumbnail_url}
                  // Clicking on any thumbnail should update the main image to match that shown in the thumbnail clicked
                  onClick={() => handleSelect(photo.url, i)}
                  // The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.
                  id={i === selectedPhotoIndex ? 'selected' : null}
                />
              })}
            </div>
            <button onClick={() => scrollForward()}>↓</button>
          </div>
          <img className='main-img' src={photos[selectedPhotoIndex].url}></img>
        </div>
        : null}
    </div>
  )
};

// If more than 7 images are in the set for the style selected, the user should be able to scroll forward and backwards through the thumbnails.  An arrow button pointing either direction should allow the customer to scroll through the remaining thumbnails in either direction. done but they should conditional render only when there's more than 7 thumbnails

// todo

// Up to 7  thumbnail images will be displayed at a given time in the list.

// Customers should also be able to change to the next or previous image in the set using forward and backwards arrow buttons appearing near the right and left edges of the image, respectively.  Upon clicking the right or left arrow, the main image and the thumbnail highlighted should update.

// If upon navigating to the previous or next image using the arrows, the thumbnail corresponding to the now selected image is no longer visible, then the thumbnail list should scroll similarly such that the newly selected thumbnail is visible.

// If the user hovers over the main image anywhere other than the thumbnails, the left arrow, or the right arrow, the mouse icon should change to show a magnifying glass.  If the user clicks on the image, the image gallery should change to the expanded view.

// If the first image is selected, the left arrow should not appear.  Similarly, if the last image is selected, the right arrow should not appear.
