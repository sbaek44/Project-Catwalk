import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';

function YourOutfitList(props) {
  const [yourOutfit, updateYourOutfit] = useState([])
  const [photoData, updatePhotoData] = useState([])

  useEffect(() => {

  })

  let addToYourOutfit = () => {
    updateYourOutfit(yourOutfit => [...yourOutfit, props])
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.currentProduct.id}/styles`, header)
      .then((results) => (updatePhotoData(photoData => [...photoData, results.data])))

  }
    return (
      <div>
        <h3>YOUR OUTFIT</h3>
        <button onClick={addToYourOutfit}>+</button>
      </div>
    )
  }

export default YourOutfitList