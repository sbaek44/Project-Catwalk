import React, { useState, useEffect, createRef } from 'react';
import PrismaZoom from 'react-prismazoom'

export default function ExpandedView({ close, handleIconClick, url, photos, back, forward, selectedPhotoIndex }) {

  const [isZoomed, toggleZoom] = useState(false);

  const prismaZoom = createRef();

  const onClickOnZoomOut = () => {
    prismaZoom.current.zoomOut(1)
  }

  const onClickOnZoomIn = () => {
    prismaZoom.current.zoomIn(2.5)
  }

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

  return (
    <div className='expanded-gallery-modal-inner'>      <button onClick={() => close()} id='modal-x-button'>&#x2715;</button>
      <div className='expanded-arrow-and-icon-container'>
        <div className='arrow-container'>{selectedPhotoIndex > 0 ? <button className='arrow-button' onClick={(e) => {back(e)}}>&#x2190;</button> : null}</div>
        {renderExpandedViewIcons()}
        <div className='arrow-container'>{selectedPhotoIndex < photos.length - 1? <button className='arrow-button' onClick={(e) => {forward(e)}}>&#x2192;</button> : null}</div>
      </div>
      <PrismaZoom
        onZoomChange={() => toggleZoom(!isZoomed)}
        minZoom={1}
        maxZoom={2.5}
        ref={prismaZoom}
      >
        <img className='expanded-view-image' id={isZoomed ? 'zoomed' : 'not-zoomed'} src={url} />
      </PrismaZoom>
    </div>
  )
}