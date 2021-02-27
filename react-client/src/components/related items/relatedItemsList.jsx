import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RelatedItemsElements from './RelatedItemsElements.jsx';

function RelatedItemsList(props) {
  const [relatedItemsIds, updateRelatedItems] = useState([]);

  useEffect(() => {
    if (relatedItemsIds.length === 0) {
      getRelatedItems()
    };
  },  [relatedItemsIds])

  let getRelatedItems = () => {
    let currentProductId = props.currentProduct.id || 16095;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/related`, header)
      .then((results) => updateRelatedItems(results.data))
      .catch((err) => console.log(err))
  };

  return (
    <div>
      <RelatedItemsElements relatedItemsIds={relatedItemsIds} />
    </div>
  )
}

export default RelatedItemsList