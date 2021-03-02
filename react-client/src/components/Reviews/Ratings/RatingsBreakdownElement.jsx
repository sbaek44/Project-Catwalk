import React from 'react';

const RatingsBreakdownElement = ({ score, percentage }) => (
  <div style={{display: 'flex', flexDirection: 'row'}} >
    {score}
    stars
    <div className="progress">
      <div className="progress-done"
        style={{
          opacity: 1,
          width: `${percentage}%`
        }}>
      </div>
    </div>
  </div>
)

export default RatingsBreakdownElement