import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import Stars from '../Reviews/Ratings/Stars.jsx';

function YourOutfitList(props) {
  const [yourOutfit, updateYourOutfit] = useState([]);
  const [photoData, updatePhotoData] = useState([]);

  useEffect(() => {
    let photoDataArr = [];
    let currentProductId = props.currentProduct.id || 16060;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${currentProductId}/styles`, header)
      .then((results) => (photoDataArr.push(Number(results.data.product_id), results.data.results[0].photos[0].thumbnail_url )))
      .then(updatePhotoData(photoDataArr))
      .catch(err => console.log(err))
  }, [props.currentProduct])

  let addToYourOutfit = () => {
    if (!yourOutfit.includes(props.currentProduct)) {
      updateYourOutfit((yourOutfit) => ([...yourOutfit, props.currentProduct]))
    }
  }

  let removeFromYourOutfit = (e) => {
    let id = Number(e.target.value)
    let filteredOutfit = yourOutfit.filter((outfit) => (outfit.id !== id))
    updateYourOutfit(filteredOutfit)
  }

  if (yourOutfit.length === 0) {
    return (
      <div>
        <h3>YOUR OUTFIT</h3>
        <div id="emptyOutfit">
          <button onClick={addToYourOutfit}>+</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {yourOutfit.map((outfit, i) => (
          <div id="yourOutfitCard" key={i}>
            <img src={photoData[1]} />
            <div id="yourOutfitCategory">{outfit.category}</div>
            <div id="yourOutfitName">{outfit.name}</div>
            <div id="yourOutfitPrice">{outfit.sale_price ? outfit.sale_price : outfit.default_price}</div>
            <Stars id="cardStars" avgRating={props.avgRating} />
            <button value={outfit.id} onClick={removeFromYourOutfit}>Delete</button>
          </div>
        ))}
        <button onClick={addToYourOutfit}>+</button>
      </div>
    )
  }
}

export default YourOutfitList