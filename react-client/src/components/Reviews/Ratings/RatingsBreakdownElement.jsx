import React, { useState, useEffect } from 'react';

const RatingsBreakdownElement = ({ score, percentage, filterReviews, addFilters, removeFilters }) => {
  // store the filters in an array.
  // when star is clicked. we should check if the filter exists on that array,
  // if it doesnt then we want to run add filter and then add the filter to that arary
  // if it does exist, then it means the user wants to remove that filter.
  // so we will run removeFilter and remove it from the array
  return (
      <div style={{display: 'flex', flexDirection: 'row'}} >
      <div onClick={() => addFilters(score)} >
        {score}
        stars
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