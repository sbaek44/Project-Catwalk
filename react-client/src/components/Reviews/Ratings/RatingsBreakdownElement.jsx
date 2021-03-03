import React, { useState, useEffect } from 'react';

const RatingsBreakdownElement = ({ score, percentage, manipulateFilters }) => {
  return (
      <div style={{display: 'flex', flexDirection: 'row'}} >
      <div onClick={() => manipulateFilters(score)} >
       <div id="score" className="text" >
       {`${score}
        stars`}
       </div>
      </div>
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
}
export default RatingsBreakdownElement