import React, { useState, useEffect, createRef } from 'react';

// wrote this as class component based off a guide but this sucks, only useful thing was learning about createRef and that 'zooming' is apparently just increasing the size by 2.5x

// going to rewrite this as functional component

// still need to have it be responsive and not get cut off the page once it's zoomed in anyway

export default class ExpandedView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      height: null,
      width: null
    }

    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)

    this.imgRef = createRef()

  }
  componentDidMount() {
    // Save initial dimention of image as class properties
    this.initialHeight = this.imgRef.current.clientHeight
    this.initialWidth = this.imgRef.current.clientWidth
  }

  handleZoomIn() {

    // Fetch current height and width
    const height = this.imgRef.current.clientHeight
    const width = this.imgRef.current.clientWidth

    // 2.5x zoom
    this.setState({
      height: height * 2.5,
      width: width * 2.5,
    })
  }

  handleZoomOut() {

    // Assign original height and width
    this.setState({
      height: this.initialHeight,
      width: this.initialWidth,
    })
  }

  renderExpandedViewIcons() {
    return <div className='expanded-view-icons-row'>
      {this.props.photos.map((photo, i) => {
        return <div
          className='expanded-view-icon'
          key={i}
          onClick={() => this.props.handleIconClick(photo.url, i)}
          id={i === this.props.selectedPhotoIndex ? 'selected' : null}
          >
          </div>
      })}
    </div>
  }

  render() {
    // Assign current height and width to the image
    const imgStyle = { height: this.state.height, width: this.state.width }
    const { toggleGalleryView, url, photos, back, forward } = this.props;
    return (
      <div>
        <button onClick={toggleGalleryView} style={{ width: 60, height: 20 }}>CLOSE</button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button onClick={this.handleZoomIn}>Zoom In</button>
          <button onClick={this.handleZoomOut}>Zoom Out</button>
          <button onClick={back()}>&#x2190;</button>
          <div>{this.renderExpandedViewIcons()}</div>
          <button onClick={forward()}>&#x2192;</button>
        </div>
        {/* Assign reference to DOM element     */}
        <img id='expanded-image' style={imgStyle} ref={this.imgRef} src=
          {this.props.url} alt='hello world' />
      </div>
    )
  }


}