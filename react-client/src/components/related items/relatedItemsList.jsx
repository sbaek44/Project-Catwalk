import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RelatedItemsElements from './RelatedItemsElements.jsx';
import YourOutfitList from './YourOutfitList.jsx';

function RelatedItemsList(props) {
  const [currentProductFeatures, updateCurrentProductFeatures] = useState([]);
  const [relatedItemsIds, updateRelatedItems] = useState([]);

  useEffect(() => {
    let currentProductId = props.currentProduct.id || 16060;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}`, header)
    .then((results) => (updateCurrentProductFeatures(results.data)))
    .then(() => (
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/related`, header)
      .then((results) => (updateRelatedItems(results.data)))
      .catch((err) => console.log(err))
    ))
  },  [props.currentProduct])

  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <RelatedItemsElements
        currentProductFeatures={currentProductFeatures}
        relatedItemsIds={relatedItemsIds}
        avgRating={props.avgRating}
        selectProduct={props.selectProduct} />
    </div>
  )
}

export default RelatedItemsList