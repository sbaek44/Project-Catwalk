import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RelatedItemCard from './RelatedItemCard.jsx';

// need a function to clear out or reset dataArr when a new product is clicked

function RelatedItemsElements(props) {
  const [dataArr, updateDataArr] = useState([])
  const [stylesData, updateStylesData] = useState([])

  useEffect(() => {
    getRelatedData()
    getRelatedPhotos()
  }, [props.currentProductFeatures])

  let getRelatedData = () => {
    let uniqueItems = [];
    props.relatedItemsIds.map(item => {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${item}`, header)
        .then((results) => (uniqueItems.push(results.data)))
        .then(() => (updateDataArr(uniqueItems)))
        .catch((err) => (console.log(err)))
    })
  }

  let getRelatedPhotos = () => {
    props.relatedItemsIds.map(item => {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${item}/styles`, header)
        .then((results) => (updateStylesData(stylesData => ([...stylesData, results.data]))))
        .catch((err) => (console.log(err)))
    })
  }

  return (
    <div>
      <RelatedItemCard
        stylesData={stylesData}
        dataArr={dataArr}
        currentProduct={props.currentProduct}
        currentProductFeatures={props.currentProductFeatures}
        relatedItemsIds={props.relatedItemsIds}
        avgRating={props.avgRating}
        selectProduct={props.selectProduct} />
    </div>
  )
}

export default RelatedItemsElements