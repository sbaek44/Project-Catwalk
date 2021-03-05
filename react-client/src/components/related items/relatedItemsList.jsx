import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}`, header)
      .then((results) => (updateCurrentProductFeatures(results.data)))
      .catch((err) => (console.log))
  }

  let getRelatedIds = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/related`, header)
      .then((results) => (updateRelatedItems(results.data)))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
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