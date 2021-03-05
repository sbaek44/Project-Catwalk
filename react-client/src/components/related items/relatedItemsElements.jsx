import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RelatedItemCard from './RelatedItemCard.jsx';

// need a function to clear out or reset dataArr when a new product is clicked

function RelatedItemsElements(props) {
  const [dataArr, updateDataArr] = useState([])
  const [stylesData, updateStylesData] = useState([])

  useEffect(() => {
    let uniqueItems = [];
    props.relatedItemsIds.map(item => {
      let currentProductId = item || 16060;
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}`, header)
      // .then((results) => (updateDataArr(results.data)))
        .then((results) => ((uniqueItems.push(results.data))))
        .then(() => (updateDataArr(uniqueItems)))
        .then(() => (
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/styles`, header)))
          .then((results) => (updateStylesData(stylesData => ([...stylesData, results.data]))))
        .catch(err => console.log(err))
    })
  }, [props.relatedItemsIds])

  return (
    <div>
      <RelatedItemCard
        stylesData={stylesData}
        dataArr={dataArr}
        currentProductFeatures={props.currentProductFeatures}
        relatedItemsIds={props.relatedItemsIds}
        avgRating={props.avgRating}
        selectProduct={props.selectProduct} />
    </div>
  )
}

export default RelatedItemsElements