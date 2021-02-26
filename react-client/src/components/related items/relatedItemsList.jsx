import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

// class RelatedItemsList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       relatedItemsIds: [],
//       relatedItemData: []
//     }
//     this.getRelatedItems = this.getRelatedItems.bind(this)
//   }

//   componentDidMount() {
//     this.getRelatedItems()
//   }

//   getRelatedItems() {
//     console.log(this.props)
//     let currentProductId = this.props.currentProduct.id
//     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/related`, header)
//       .then((results) => {
//         this.setState({
//           relatedItemsIds: results.data
//         }, () => console.log(this.state))
//       })
//       .catch((err) => console.log(err))
//   };

//   render() {
//     return (
//       <div>
//         hi
//       </div>
//     )
//   }
// }


// pictures
// results.data.results[0].photos[0].thumbnail_url
// GET /products/:product_id/styles

function RelatedItemsList() {
  // const [relatedItemsIds, updateRelatedItems] = useState([])
  // useEffect(() => {
  //   console.log(relatedItemsIds)
  //   getRelatedItems()
  // }, [relatedItemsIds])

  // const [relatedItemData, updateRelatedItemData] = useState([])
  // useEffect(() => {

  // })

  // getRelatedItems() {
  //   let currentProductId = this.props.currentProduct.id
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/related`, header)
  //     .then((results) => updateRelatedItems(results.data))
  //     .catch((err) => console.log(err))
  // };

  // getRelatedItemData() {
  //   let
  //   axios.get()
  // }

  return (
    <div>
      hello from RelatedItemsList
    </div>
  )
}
export default RelatedItemsList