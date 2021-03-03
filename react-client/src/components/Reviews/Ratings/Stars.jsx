import React from 'react';

const Stars = ({ avgRating }) => {
  let percent = avgRating * 20;
  return (
    <div>
      <div className="stars-outer">
        <div style={{width: `${percent}%`}} className="stars-inner">
        </div>
      </div>
    </div>
  )
};

export default Stars;
