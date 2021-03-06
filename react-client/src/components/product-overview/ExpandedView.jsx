import React, { useState, useEffect } from 'react';
import { Magnifier, MOUSE_ACTIVATION, TOUCH_ACTIVATION } from "react-image-magnifiers";

export default function ExpandedView({ close, handleIconClick, url, photos, back, forward, selectedPhotoIndex }) {

  const [isZoomed, toggleZoom] = useState(false);

  const renderExpandedViewIcons = () => {
    return <div className='expanded-view-icons-row'>
      {photos.map((photo, i) => {
        return <div
          className='expanded-view-icon'
          key={i}
          onClick={(e) => handleIconClick(e, photo.url, i)}
          id={i === selectedPhotoIndex ? 'selected' : null}
        >
        </div>
      })}
    </div>
  }

  useEffect(() => {
    let box = document.querySelector('.expanded-view-image');
    if (box !== null) {
      let width = box.clientWidth;
      let height = box.clientHeight;
      console.log(`img number ${selectedPhotoIndex} dimensions: ${width} x ${height}`)
    }
  }, [url])

  return (
    <div className='expanded-gallery-modal-inner'>
      <button onClick={() => close()} id='modal-x-button'>&#x2715;</button>
      {isZoomed ?
        <div className='expanded-view-message'>pan around by dragging the cursor; click again to zoom out</div>
        :
        <div className='expanded-arrow-and-icon-container'>
          <button
            id={selectedPhotoIndex > 0 ? null : 'hidden'}
            className='horizontal-arrow'
            style={{ marginTop: '-0.5rem' }}
            onClick={(e) => { back(e) }}
          >&#x2190;
            </button>
          {renderExpandedViewIcons()}
          <button
            id={selectedPhotoIndex < photos.length - 1 ? null : 'hidden'}
            className='horizontal-arrow'
            style={{ marginTop: '-0.5rem' }}
            onClick={(e) => { forward(e) }}
          >&#x2192;
            </button>
        </div>
      }
      <Magnifier
        className='expanded-view-image'
        cursorStyle='crosshair'
        imageSrc={url}
        imageAlt='HEIR FORCE ONES'
        onZoomStart={() => toggleZoom(true)}
        onZoomEnd={() => toggleZoom(false)}
        mouseActivation={MOUSE_ACTIVATION.CLICK}
        touchActivation={TOUCH_ACTIVATION.TAP}
        dragToMove={false}
      />
    </div >
  )
}