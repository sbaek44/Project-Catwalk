import React from 'react';
import RatingsBreakdownElement from './RatingsBreakdownElement.jsx';

const RatingsBreakdownList = ({ percentagePerRating, addFilters, removeFilters, filterReviews }) => (
    <div>
      { percentagePerRating.map((percentage, i) => {
        if (i > 0) {
          return (
            <RatingsBreakdownElement
              addFilters={addFilters}
              removeFilters={removeFilters}
              filterReviews={filterReviews}
              key={i} score={i} percentage={percentage} />
          )
        }
      }) }
    </div>
)


export default RatingsBreakdownList;
