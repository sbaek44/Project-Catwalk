import React, { useState, useEffect, createRef } from 'react';
import PrismaZoom from 'react-prismazoom'

export default function ExpandedView({ close, handleIconClick, url, photos, back, forward, selectedPhotoIndex }) {

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
          onClick={() => handleIconClick(photo.url, i)}
          id={i === selectedPhotoIndex ? 'selected' : null}
        >
        </div>
      })}
    </div>
  }

  return (
    <div>
      <div>
        <button onClick={() => close()} style={{ width: 20, height: 20 }}>X</button>
        <div className='expanded-arrow-and-icon-container'>
          <button className='expanded-arrow-button' onClick={back()}>&#x2190;</button>
          {renderExpandedViewIcons()}
          <button className='expanded-arrow-button' onClick={forward()}>&#x2192;</button>
        </div>
        <PrismaZoom
          maxZoom={2.5}
          ref={prismaZoom}
        >
          <img className='expanded-view-image' src={url} />
        </PrismaZoom>
      </div>
    </div>
  )
}