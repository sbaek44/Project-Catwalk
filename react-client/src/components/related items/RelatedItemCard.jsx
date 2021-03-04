import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import header from '../../../../config.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex: 12
  }
};

function RelatedItemCard(props) {
  const [thumbnails, setThumbnails] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  let thumbnailsArr = [];
  useEffect(() => {
    for (let i = 0; i < props.stylesData.length; i++) {
      thumbnailsArr.push([Number(props.stylesData[i].product_id), props.stylesData[i].results[0].photos[0].thumbnail_url])
    }
    setThumbnails(thumbnailsArr)
  }, [props.stylesData, props.currentProductFeatures])

  let getThumbnail = (id) => {
    for (let i = 0; i < thumbnails.length; i++) {
      if (id === thumbnails[i][0]) {
        return thumbnails[i][1]
      }
    }
  }

  // props.currentProductFeatures = current product
  // props.dataArr = related products info/features
  // props.stylesData = related products photos

  if (props.stylesData.length === 0 || props.currentProductFeatures.length === 0) {
    return null
  } else if (modalIsOpen === true) {
      return (
        <div>
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={() => setModalIsOpen(false)}>
            <h3 style={{textAlign: 'center'}}>Comparing</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Current Product</th>
                  <th>Characteristics</th>
                  <th>Compare Product</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.currentProductFeatures.name}</td>
                  <td></td>
                  <td>Compare product name</td>
                </tr>
                <tr>
                  <td>
                  {props.currentProductFeatures.features.map((feature, i) => (

                    <div key={i}>{feature.feature}: {feature.value}</div>
                    ))
                  }
                  </td>
                </tr>
              </tbody>
            </table>
            <button style={{textAlign: 'center'}} onClick={() => setModalIsOpen(false)}>Close</button>
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
          <div id="cardStars">Rating: {props.avgRating}</div>
        </div>
      ))}
      </div>
    )
  }
}

export default RelatedItemCard