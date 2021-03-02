import React from 'react';
import RatingsBreakdownElement from './RatingsBreakdownElement.jsx';

const RatingsBreakdownList = (props) => (
    <div>
      { props.percentagePerRating.map((percentage, i) => {
        if (i > 0) {
          return <RatingsBreakdownElement key={i} score={i} percentage={percentage} />;
        }
      }) }
    </div>
)


export default RatingsBreakdownList;
