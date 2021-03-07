import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsElements from './RelatedItemsElements.jsx';
import YourOutfitList from './YourOutfitList.jsx';

function RelatedItemsList(props) {
  const [currentProductFeatures, updateCurrentProductFeatures] = useState([]);
  const [relatedItemsIds, updateRelatedItems] = useState([]);
  let currentProductId = props.currentProduct.id || 16060;

  useEffect(() => {
    getCurrentFeatures()
    getRelatedIds()
  },  [props.currentProduct])

  let getCurrentFeatures = () => {
    axios.get(`http://127.0.0.1:3000/api/shared/products/${currentProductId}`)
      .then((results) => (updateCurrentProductFeatures(results.data)))
      .catch((err) => (console.log))
  }

  let getRelatedIds = () => {
    axios.get(`http://127.0.0.1:3000/api/shared/products/${currentProductId}/related`)
      .then((results) => (updateRelatedItems(results.data)))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h3 id="related-title">RELATED PRODUCTS</h3>
      <RelatedItemsElements
        currentProductFeatures={currentProductFeatures}
        relatedItemsIds={[...new Set(relatedItemsIds)]}
        avgRating={props.avgRating}
        selectProduct={props.selectProduct}
        currentProduct={props.currentProduct} />
    </div>
  )
}

export default RelatedItemsList