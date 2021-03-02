import React from 'react';

const RatingsBreakdownElement = ({ score, percentage }) => {
  // console.log(score, percentage)
  return (
    <div style={{display: 'flex', flexDirection: 'row'}} >
      {score} stars
        <div className="progress">
          <div className="progress-done" style={{
            opacity: 1,
            width: `${percentage}%`
          }}></div>
      </div>
    </div>

  );
};

export default RatingsBreakdownElement