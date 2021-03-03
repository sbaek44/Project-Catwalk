import React, { useState, useEffect } from 'react';

export default function ImageGallery({ selectPhoto, photos }) {

  // By default, the first image in the set will be displayed as the main image
  // When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style

  const [selectedPhotoIndex, changePhotoIndex] = useState(0);
  // note - some larger imgs currently bleed out of overview component, need to somehow standardize the image sizes and/or the size of the gallery component itself

  // The gallery will be viewable in two states.  A default collapsed view, and an expanded view.
  const [expandedGalleryView, toggleGalleryView] = useState(false);

  const between = (target, min, max) => {
    return target >= min && target <= max;
  }

  const shouldShowThumbnail = (idx) => {
    if (selectedPhotoIndex + 6 < photos.length) {
      return between(idx, selectedPhotoIndex, selectedPhotoIndex + 6)
    } else {
      let diff = Math.abs((selectedPhotoIndex + 7) - photos.length)
      if (between(idx, selectedPhotoIndex - diff, photos.length)) {
        return true;
      } else {
        return between(idx, selectedPhotoIndex, photos.length)
      }
    }
  }


  const renderThumbnails = () => {
    if (photos.length < 7) {
      return <div className='gallery-thumbnails-container'>
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
      </div>
    } else {
      return <div className='gallery-thumbnails-container'>
        {/* Up to 7  thumbnail images will be displayed at a given time in the list. this is implemented, but some thumbnails have the wrong image even though scrolling through them works properly. todo */}
        <div className='gallery-thumbnails'>
          <div className='arrow-container'>
            {selectedPhotoIndex > 0 ? <button className='arrow-button' onClick={() => scrollBack()}>&#8963;</button> : null}
          </div>
          {photos.map((photo, i) => {
            return <img
              className={shouldShowThumbnail(i) ? 'image-thumbnail' : 'image-thumbnail-hidden'}
              key={i}
              src={photo.thumbnail_url}
              onClick={() => handleSelect(photo.url, i)}
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          })}
          <div className='arrow-container'>
            {selectedPhotoIndex < photos.length - 1 ? <button className='arrow-button' onClick={() => scrollForward()}>&#8964;</button> : null}
          </div>
        </div>

      </div>
    }
  }

  const handleSelect = (url, idx) => {
    selectPhoto(url);
    changePhotoIndex(idx);
  }

  const scrollForward = () => {
    if (selectedPhotoIndex === photos.length - 1) {
      changePhotoIndex(0);
    } else {
      let nextIndex = selectedPhotoIndex + 1;
      changePhotoIndex(nextIndex);
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
          {renderThumbnails()}
          <img className='main-img' src={photos[selectedPhotoIndex].url}></img>
          <div>
          {selectedPhotoIndex > 0 ?
            <button id='left' className='arrow-button' onClick={() => scrollBack()}>&#x2190;</button>
            : null}
          {selectedPhotoIndex < photos.length - 1 ?
            <button id='right' className='arrow-button' onClick={() => scrollForward()}>&#x2192;</button>
            : null}
          </div>
        </div>
        : null}
    </div>
  )
};



// Customers should also be able to change to the next or previous image in the set using forward and backwards arrow buttons appearing near the right and left edges of the image, respectively.  Upon clicking the right or left arrow, the main image and the thumbnail highlighted should update.

// If upon navigating to the previous or next image using the arrows, the thumbnail corresponding to the now selected image is no longer visible, then the thumbnail list should scroll similarly such that the newly selected thumbnail is visible.

// If the user hovers over the main image anywhere other than the thumbnails, the left arrow, or the right arrow, the mouse icon should change to show a magnifying glass.  If the user clicks on the image, the image gallery should change to the expanded view.

// If the first image is selected, the left arrow should not appear.  Similarly, if the last image is selected, the right arrow should not appear.
