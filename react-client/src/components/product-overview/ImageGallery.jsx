import React, { useState, useEffect } from 'react';
import ExpandedView from './ExpandedView.jsx';
import Modal from 'react-modal';

const modalStyle = {
  content : {
    top                   : '0.5%',
    left                  : 0,
    right                 : 0,
    overflowX             : 'hidden',
    height                : 800,
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
              onClick={() => handleThumbnailClick(photo.url, i)}
              // The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          })}
        </div>
      </div>
    } else {
      return <div className='gallery-thumbnails-container'>
        <div className='gallery-thumbnails'>
          <div className='arrow-container'>
            <button className={selectedPhotoIndex > 0 ? 'arrow-button' : 'arrow-button-hidden'} onClick={() => scrollBack()}>&#8963;</button>
          </div>
          {photos.map((photo, i) => {
            return <img
              className={shouldShowThumbnail(i) ? 'image-thumbnail' : 'image-thumbnail-hidden'}
              key={i}
              src={photo.thumbnail_url}
              onClick={() => handleThumbnailClick(photo.url, i)}
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          })}
          <div className='arrow-container' style={{ marginTop: -10 }}>
            <button className={selectedPhotoIndex < photos.length - 1 ? 'arrow-button' : 'arrow-button-hidden'} onClick={() => scrollForward()}>&#8964;</button>
          </div>
        </div>

      </div>
    }
  }

  const handleThumbnailClick = (url, idx) => {
    selectPhoto(url);
    changePhotoIndex(idx);
  }

  const scrollForward = () => {
    if (selectedPhotoIndex === photos.length - 1) {
      return
      // changePhotoIndex(0) for infinite scroll
    } else {
      let nextIndex = selectedPhotoIndex + 1;
      changePhotoIndex(nextIndex);
    }
  }

  const scrollBack = () => {
    if (selectedPhotoIndex === 0) {
      return
      // changePhotoIndex(photos.length - 1) for infinite scroll
    } else {
      let nextIndex = selectedPhotoIndex - 1;
      changePhotoIndex(nextIndex)
    }
  }

  // still needs work but ok for testing
  const mainImageCSS = (photoURL) => {
    return {
      width: 'auto',
      height: '100%',
      backgroundImage: `url(${photoURL})`,
      overflow: 'hidden',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat'
    }
  }

  // In the expanded view, thumbnails will not appear over the main image.  Instead, icons indicating each image in the set will appear.  These icons will be much smaller, but will have the same functionality in that clicking on them will skip to that image in the set.   Additionally the icon for the currently selected image will be distinguishably different from the rest.

  const renderExpandedViewIcons = () => {
    return <div className='expanded-view-icons-row'>
      {photos.map((photo, i) => {
        return <div
          className='expanded-view-icon'
          key={i}
          onClick={() => handleIconClick(photo.url, i)}
          id={i === selectedPhotoIndex ? 'selected' : null}
          >
          </div>
      })}
    </div>
  }

  // this is exactly the same as handleThumbNailClick rn, not sure if they will end up needing slightly diff functionality or not, delete this and switch expanded-view-icons' onClick back to handleThumbNailClick if not
  const handleIconClick = (url, idx) => {
    selectPhoto(url);
    changePhotoIndex(idx);
  }

  useEffect(() => {
    // console.log(expandedGalleryView)
  }, [expandedGalleryView])


  return (
    <div className='image-gallery-outer'>
      {photos.length ?
        <div
          className='image-gallery'
          style={mainImageCSS(photos[selectedPhotoIndex].url)}
          >
          {/* EXPANDED VIEW */}
          <Modal id='expanded-gallery-modal' isOpen={expandedGalleryView} style={modalStyle} ariaHideApp={false} >
            <ExpandedView
              close={() => toggleGalleryView(false)}
              photos={photos}
              selectedPhotoIndex={selectedPhotoIndex}
              url={photos[selectedPhotoIndex].url}
              handleIconClick={handleIconClick}
              back={() => scrollBack}
              forward={() => scrollForward}
            >
            </ExpandedView>
          </Modal>

          {renderThumbnails()}

          {/* todo: refactor this disgusting css/hardcoding */}
          <button className='horizontal-arrow' id={selectedPhotoIndex > 0 ? 'left-arrow' : 'left-hidden'} onClick={() => scrollBack()}>&#x2190;</button>
          <button className='horizontal-arrow' id={selectedPhotoIndex < photos.length - 1 ? 'right-arrow' : 'right-hidden'} onClick={() => scrollForward()}>&#x2192;</button>

          {/* expanded view is supposed to open on img click, but for now just use this button */}
          <button onClick={() => toggleGalleryView(!expandedGalleryView)} style={{width: 200, height: 20}}>open the EXPANDED VIEW</button>
        </div>
        : null}
    </div>
  )
};
