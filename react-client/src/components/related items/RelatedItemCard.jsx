import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RelatedItemCard(props) {
  const [thumbnails, setThumbnails] = useState([])

  let thumbnailsArr = [];
  useEffect(() => {
    for (let i = 0; i < props.stylesData.length; i++) {
      thumbnailsArr.push([Number(props.stylesData[i].product_id), props.stylesData[i].results[0].photos[0].thumbnail_url])
    }
    setThumbnails(thumbnailsArr)
  }, [props.stylesData])

  let getThumbnail = (id) => {
    for (let i = 0; i < thumbnails.length; i++) {
      if (id === thumbnails[i][0]) {
        return thumbnails[i][1]
      }
    }
  }

  if (props.stylesData.length === 0) {
    return null
  } else {
    return (
      <div  style={{display: 'flex', flexDirection: 'row'}}>
      {props.dataArr.map((item, i) => (
        <div id="relatedItemCard" key={i}>
          <img src={getThumbnail(item.id)} />
          <div id="cardCategory">{item.category}</div>
          <div id="cardName">{item.name}</div>
          <div id="cardPrice">{item.default_price}</div>
          <div id="cardStars">*****</div>
        </div>
      ))}
      </div>
    )
  }
}

export default RelatedItemCard