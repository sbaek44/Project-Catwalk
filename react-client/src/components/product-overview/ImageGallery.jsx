import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import header from '../../../../config.js';

export default function ImageGallery(props) {

  const { selectedStyle, selectedProduct, selectedPhoto, photos } = props;

  const [expandedGalleryView, toggleGalleryView] = useState(false); // Conditional render image gallery based on this

  // The largest piece of the Overview module will be a photo gallery showing images of the product.  The photos presented in this gallery will be specific to the currently selected product style.  Each time a new style is chosen, the gallery will update to show photos corresponding to the new style.   Each style will have a set of images associated with it.  The gallery will allow customers to browse between and zoom in on these photos.
  // The gallery will be viewable in two states.  A default collapsed view, and an expanded view.

  const renderThumbnails = () => {
    // in array of photo urls, thumbnail is always at index 0, full img at index 1
    // these dont do anything yet when clicked
    return photos.map((photo, i) => {
      return <img key={i} style={{ width: 50, height: 50 }} src={photo[0]} />
    })
  }

  // useEffect(() => {
  //   if (photos) {
  //     // selectedPhoto coresponds to full img for selected style already
  //     console.log('photo urls', photos);
  //   }
  // }, [photos])

  return (
    <div className='image-gallery'>
      {photos.length ?
        <div className='gallery-thumbnails'>
          {renderThumbnails()}
        </div>
        : null}
      {selectedPhoto !== '' ?
        <img className='main-image' src={selectedPhoto} />
        : null}
    </div>
  )
};

// 1.1.4.1.    Default View
// The default view of the image gallery will be a single main image, overlaid by the list of thumbnail images.
// By default, the first image in the set will be displayed as the main image.  This image will match the smaller thumbnail image shown first.
// When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style.
// Clicking on any thumbnail should update the main image to match that shown in the thumbnail clicked.
// The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.
// Clicking on the currently selected thumbnail will have no further effect.
// Up to 7  thumbnail images will be displayed at a given time in the list.
// If more than 7 images are in the set for the style selected, the user should be able to scroll forward and backwards through the thumbnails.   An arrow button pointing either direction should allow the customer to scroll through the remaining thumbnails in either direction.
// Customers should also be able to change to the next or previous image in the set using forward and backwards arrow buttons appearing near the right and left edges of the image, respectively.  Upon clicking the right or left arrow, the main image and the thumbnail highlighted should update.
// If upon navigating to the previous or next image using the arrows, the thumbnail corresponding to the now selected image is no longer visible, then the thumbnail list should scroll similarly such that the newly selected thumbnail is visible.
// If the user hovers over the main image anywhere other than the thumbnails, the left arrow, or the right arrow, the mouse icon should change to show a magnifying glass.  If the user clicks on the image, the image gallery should change to the expanded view.
// If the first image is selected, the left arrow should not appear.  Similarly, if the last image is selected, the right arrow should not appear.
// 1.1.4.2.    Expanded View
// The expanded view of the image gallery will overlay the rest of the item detail page.   Much of the same functionality on the default view will also be available on the expanded view.
// The expanded view will also primarily consist of a main image.  Unlike the default view, this main image will span the entire screen.
// The main image will still offer right and left arrows, which will have the same function of scrolling through the image set.
// In the expanded view, thumbnails will not appear over the main image.  Instead, icons indicating each image in the set will appear.  These icons will be much smaller, but will have the same functionality in that clicking on them will skip to that image in the set.   Additionally the icon for the currently selected. image will be distinguishably different from the rest.
// In the default view, clicking on the image would open the expanded view.   In the expanded view, however, clicking on the main image will zoom the image by 2.5 times.   Instead of displaying a magnifying glass on hover, in the expanded view the mouse should become a “+” symbol while hovering over the main image.
// After clicking, the zoomed image will be too large to display in the space provided.   In this case, the portion of the image shown within the window should correspond to the current mouse position relative to the screen.   For example, by moving the mouse right the portion of the zoomed image shown should pan to the right.
// Furthermore, the position of the mouse relative to the centering of the zoomed image should be proportional.  If the mouse is all the way in the bottom left corner of the expanded image gallery window, the bottom left corner of the zoomed image should be displayed.   Moving the mouse to the top right should smoothly move the zoomed image available such until the top right of the image is displayed.
// While the image is zoomed, no arrow buttons or thumbnail selection icons will be available.   The mouse should display as a “-” symbol.   Upon clicking the image in this state, the user should be returned to the normal expanded image gallery view.
