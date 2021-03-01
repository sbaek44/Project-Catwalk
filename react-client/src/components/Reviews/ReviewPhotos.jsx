import React from 'react';

const ReviewPhotos = (props) => (
  <div>
    { props.photos.map((photo) => (
      <img className="reviewThumb" key={photo.id} src={photo.url} alt="" />
    )) }
  </div>
);

export default ReviewPhotos;
