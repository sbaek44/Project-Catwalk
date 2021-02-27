import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import RelatedItemCard from './RelatedItemCard.jsx';

// pictures
// results.data.results[0].photos[0].thumbnail_url
// GET /products/:product_id/styles

function RelatedItemsElements(props) {
const [dataArr, updateDataArr] = useState([])
useEffect(() => {
  props.relatedItemsIds.map(item => {
    let currentProductId = item || 16095;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}`, header)
      .then((results) => (updateDataArr(results.data)))
      .catch(err => console.log(err))
  })
}, [props.relatedItemsIds])

// console.log(dataArr)
  return (
    <div>
      {/* <RelatedItemCard dataArr={dataArr} /> */}
    </div>
  )
}
// need a function to clear out or reset dataArr when a new product is clicked
export default RelatedItemsElements