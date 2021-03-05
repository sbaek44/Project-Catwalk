import React, { useState, useEffect } from 'react';
import ExpandedView from './ExpandedView.jsx';
import Modal from 'react-modal';

const modalStyle = {
  content: {
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    height: '100vh',
  }
};

export default function ImageGallery({ selectPhoto, photos }) {

  // By default, the first image in the set will be displayed as the main image
  // When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style

  const [selectedPhotoIndex, changePhotoIndex] = useState(0);

  // The gallery will be viewable in two states.  A default collapsed view, and an expanded view.
  const [expandedGalleryView, toggleGalleryView] = useState(false);

  const between = (target, min, max) => {
    return target >= min && target <= max;
  }

  // If more than 7 images are in the set for the style selected, the user should be able to scroll forward and backwards through the thumbnails. An arrow button pointing either direction should allow the customer to scroll through the remaining thumbnails in either direction.

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
              onClick={(event) => {
                handleThumbnailClick(event, photo.url, i)
              }}
              // The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          })}
        </div>
      </div>
    } else {
      return <div className='gallery-thumbnails-container'>
        <div className='gallery-thumbnails'>
          <div className='vertical-arrow-container' style={{ marginBottom: 10 }}>
            <button
              id={selectedPhotoIndex === 0 ? 'hidden' : null}
              className='vertical-arrow-button'
              onClick={(event) => {scrollBack(event)}}>
              &#8963;</button>
          </div>
          {photos.map((photo, i) => {
            return <img
              className={shouldShowThumbnail(i) ? 'image-thumbnail' : 'image-thumbnail-hidden'}
              key={i}
              src={photo.thumbnail_url}
              onClick={(event) => {
                handleThumbnailClick(event, photo.url, i)
              }}
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          })}
          <div className='vertical-arrow-container' style={{ marginTop: -15 }}>
          <button
              id={selectedPhotoIndex === photos.length - 1 ? 'hidden' : null}
              className='vertical-arrow-button'
              onClick={(event) => {scrollForward(event)}}>
              &#8964;</button>
          </div>
        </div>
      </div>
    }
  }

  const handleThumbnailClick = (event, url, idx) => {
    event.stopPropagation();
    selectPhoto(url);
    changePhotoIndex(idx);
  }

  const scrollForward = (event) => {
    event.stopPropagation();
    if (selectedPhotoIndex === photos.length - 1) {
      return
      // changePhotoIndex(0) for infinite scroll
    } else {
      let nextIndex = selectedPhotoIndex + 1;
      changePhotoIndex(nextIndex);
    }
  }

  const scrollBack = (event) => {
    event.stopPropagation();
    if (selectedPhotoIndex === 0) {
      return
      // changePhotoIndex(photos.length - 1) for infinite scroll
    } else {
      let nextIndex = selectedPhotoIndex - 1;
      changePhotoIndex(nextIndex)
    }
  }

  const mainImageCSS = (url) => {
    // possibly need to add error handling for the api url strings with typos in them ?
    return {
      marginLeft: '5px',
      border: '1px solid rgb(68, 67, 67)',
      borderRadius: '0.25rem',
      boxShadow: '1px 2px 2px darkgray',
      display: 'flex',
      flexDirection: 'row nowrap',
      zIndex: 5,
      cursor: 'zoom-in',
      width: 'auto',
      height: '100%',
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
      backgroundPosition: 'center',
    }
  }

  return (
    <div className='image-gallery-outer'>
      {photos.length ?
        <div
          className='image-gallery'
          style={mainImageCSS(photos[selectedPhotoIndex].url)}
          onClick={() => expandedGalleryView ? null : toggleGalleryView(true)}
        >
          {renderThumbnails()}

          {/* EXPANDED VIEW */}
          <Modal id='expanded-gallery-modal' isOpen={expandedGalleryView} style={modalStyle} ariaHideApp={false} >
            <ExpandedView
              close={() => toggleGalleryView(false)}
              photos={photos}
              selectedPhotoIndex={selectedPhotoIndex}
              url={photos[selectedPhotoIndex].url}
              handleIconClick={handleThumbnailClick}
              back={scrollBack}
              forward={scrollForward}
            >
            </ExpandedView>
          </Modal>

          <button className='horizontal-arrow' id={selectedPhotoIndex > 0 ? 'left-arrow' : 'left-hidden'} onClick={(event) => {scrollBack(event)}}>&#x2190;</button>
          <button className='horizontal-arrow' id={selectedPhotoIndex < photos.length - 1 ? 'right-arrow' : 'right-hidden'} onClick={(event) => {scrollForward(event)}}>&#x2192;</button>
        </div>
        : null}
    </div>
  )
};
