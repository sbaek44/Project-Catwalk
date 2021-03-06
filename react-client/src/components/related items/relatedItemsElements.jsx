import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      axios.get(`http://127.0.0.1:3000/api/shared/products/${item}`)
        .then((results) => (uniqueItems.push(results.data)))
        .then(() => (updateDataArr(uniqueItems)))
        .catch((err) => (console.log(err)))
    })
  }

  let getRelatedPhotos = () => {
    props.relatedItemsIds.map(item => {
      axios.get(`http://127.0.0.1:3000/api/shared/products/${item}/styles`)
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