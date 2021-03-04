import React, { useState, useEffect, createRef } from 'react';

// import PrismaZoom from 'react-prismazoom'
// <PrismaZoom>
//   <img src="my-image.png" />
//   <p>A text that can be zoomed and dragged</p>
// </PrismaZoom>

export default function ExpandedView({close, handleIconClick, url, photos, back, forward, selectedPhotoIndex}) {

  const [currentHeight, setHeight] = useState(null);
  const [currentWidth, setWidth] = useState(null);

  const imgRef = createRef();
  let initialHeight;
  let initialWidth;

  useEffect(() => {
    // save initial image dimensions
    initialHeight = imgRef.current.clientHeight;
    initialWidth = imgRef.current.clientWidth;
  }, []);

  const handleZoomIn = () => {
    let height = imgRef.current.clientHeight
    let width = imgRef.current.clientWidth
    setHeight(currentHeight * 2.5);
    setWidth(currentWidth * 2.5);
  }

  const handleZoomOut = () => {
    setHeight(initialHeight);
    setWidth(initialWidth);
  }

  const renderExpandedViewIcons = () =>  {
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
        <button onClick={() => close()} style={{ width: 60, height: 20 }}>CLOSE</button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button onClick={() => handleZoomIn}>Zoom In</button>
          <button onClick={() => handleZoomOut}>Zoom Out</button>
          <button onClick={back()}>&#x2190;</button>
          <div>{renderExpandedViewIcons()}</div>
          <button onClick={forward()}>&#x2192;</button>
        </div>
        {/* Assign reference to DOM element     */}
        <img id='expanded-image' style={{width: currentWidth, height: currentHeight}} ref={imgRef} src={url} alt='hello world' />
      </div>

    </div>

  )

}