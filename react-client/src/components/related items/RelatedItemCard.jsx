import React, { useState, useEffect } from 'react';
import Modal from'react-modal';
import axios from 'axios';

function RelatedItemCard(props) {
  const [thumbnails, setThumbnails] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
  } else if (modalIsOpen === true) {
      return (
        <div>
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            >
            <h2 style={{textAlign: 'center'}}>Comparing</h2>
            <div id="currentProduct">
              <h4>Current Product</h4>
              <p>{props.currentProduct.name}</p>
              <p>{props.currentProduct.default_price}</p>
            </div>
            <div id="characteristics">
              <h4>Characteristics</h4>
              </div>
            <div id="comparedProduct">
              <h4>Compared Product</h4>

            </div>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </Modal>
        </div>
      )
  } else {
    return (
      <div /*onClick={navigateToDetailPage}*/ style={{display: 'flex', flexDirection: 'row'}}>
      {props.dataArr.map((item, i) => (
        <div id="relatedItemCard" key={i}>
          <img src={getThumbnail(item.id)} />
          <button onClick={() => setModalIsOpen(true)}>Compare</button>
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