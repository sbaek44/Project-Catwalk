import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from '../Reviews/Ratings/Stars.jsx';
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components'

function YourOutfitList(props) {
  const [yourOutfit, updateYourOutfit] = useState([]);
  const [tempPhotoData, updateTempPhotoData] = useState([]);
  const [yourOutfitPhoto, updateYourOutfitPhoto] = useState([]);

  useEffect(() => {
    let currentProductId = props.currentProduct.id
    axios.get(`http://127.0.0.1:3000/api/shared/products/${currentProductId}/styles`)
      .then((results) => (updateTempPhotoData(results.data)))
      .catch((err) => (console.log(err)))
  }, [props.currentProduct])

  let addToYourOutfit = () => {
    if (!yourOutfit.includes(props.currentProduct)) {
      updateYourOutfit((yourOutfit) => ([...yourOutfit, props.currentProduct]))
      // updateYourOutfit((yourOutfit) => (yourOutfit[yourOutfit.length - 1].photo = tempPhotoData.results[0].photos[0].thumbnail_url))
      updateYourOutfitPhoto((yourOutfitPhoto) => ([...yourOutfitPhoto, [Number(tempPhotoData.product_id), tempPhotoData.results[0].photos[0].thumbnail_url]]))
    }
  }

  let removeFromYourOutfit = (e) => {
    let id = Number(e.target.value)
    updateYourOutfit(yourOutfit.filter((outfit) => (outfit.id !== id)))
    updateYourOutfitPhoto(yourOutfitPhoto.filter((photo) => (photo[0] !== id)))
  }

  let getImgSrc = (id) => {
    for (let i = 0; i < yourOutfitPhoto.length; i++) {
      if (yourOutfitPhoto[i][0] === id) {
        return yourOutfitPhoto[i][1]
      }
    }
  }

  if (yourOutfit.length === 0) {
    return (
      <div id="addOutfit">
        <h3 id="outfit-title">YOUR OUTFIT</h3>
        <div style={{display: 'flex', flexDirection: 'row'}} id="short-outfitList">
          <Carousel itemsToShow={4} showEmptySlots>
          <div id="outfit-button" onClick={addToYourOutfit}>+</div>
          </Carousel>
        </div>
      </div>
    )

  } else if (yourOutfit.length > 0) {
    return (
      <div>
      <h3 id="outfit-title">YOUR OUTFIT</h3>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <Carousel itemsToShow={4} showEmptySlots>
        {yourOutfit.map((outfit, i) => (
          <div id="yourOutfitCard" key={i}>
            <img id="yourOutfitImg" src={getImgSrc(outfit.id)} />
            <button id="remove-outfit" value={outfit.id} onClick={removeFromYourOutfit}>&#9447;</button>
            <div id="outfit-desc">
              <div id="yourOutfitCategory">{outfit.category}</div>
              <div id="yourOutfitName">{outfit.name}</div>
              <div id="yourOutfitPrice">{outfit.sale_price ? outfit.sale_price : outfit.default_price}</div>
              <Stars id="cardStars" avgRating={props.avgRating} />
            </div>
          </div>
        ))}
        <div id="outfit-button" onClick={addToYourOutfit}>+</div>
        </Carousel>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h3 id="outfit-title">YOUR OUTFIT</h3>
        <div id="short-outfitList" style={{display: 'flex', flexDirection: 'row'}}>
          {yourOutfit.map((outfit, i) => (
            <div id="yourOutfitCard" key={i}>
              <img id="yourOutfitImg" src={getImgSrc(outfit.id)} />
              <button id="remove-outfit" value={outfit.id} onClick={removeFromYourOutfit}>&#9447;</button>
              <div id="outfit-desc">
                <div id="yourOutfitCategory">{outfit.category}</div>
                <div id="yourOutfitName">{outfit.name}</div>
                <div id="yourOutfitPrice">{outfit.sale_price ? outfit.sale_price : outfit.default_price}</div>
                <Stars id="cardStars" avgRating={props.avgRating} />
              </div>
              <div id="addOutfit"></div>
            </div>
          ))}
          <div id="outfit-button" onClick={addToYourOutfit}>+</div>
         </div>
      </div>
    )
  }
}

export default YourOutfitList