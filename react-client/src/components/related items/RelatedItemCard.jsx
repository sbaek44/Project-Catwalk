import React, { useState, useEffect } from 'react';
import Modal from'react-modal';
import axios from 'axios';
import header from '../../../../config.js';
import Stars from '../Reviews/Ratings/Stars.jsx';

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
  const [thumbnails, updateThumbnails] = useState([]);;
  const [modalIsOpen, updateModalIsOpen] = useState(false);
  const [allFeatures, updateAllFeatures] = useState([]);
  const [compareName, updateCompareName] = useState('');

  useEffect(() => {
    let thumbnailsArr = [];
    for (let i = 0; i < props.stylesData.length; i++) {
      thumbnailsArr.push([Number(props.stylesData[i].product_id), props.stylesData[i].results[0].photos[0].thumbnail_url])
    }
    updateThumbnails(thumbnailsArr)
  }, [props.stylesData])

  useEffect(() => {
    let relatedFeaturesArr = props.dataArr.map(({id, name, features}) => ({id, name, features}))
    let currentFeaturesArr = [{id: props.currentProductFeatures.id, name: props.currentProductFeatures.name, features: props.currentProductFeatures.features}]
    updateAllFeatures(currentFeaturesArr.concat(relatedFeaturesArr))
  }, [props.dataArr, props.currentProductFeatures])

  let getThumbnail = (id) => {
    for (let i = 0; i < thumbnails.length; i++) {
      if (id === thumbnails[i][0]) {
        return thumbnails[i][1]
      }
    }
  }

  let modalState = (e) => {
    updateModalIsOpen(true)
    updateCompareName(e.target.name)
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
            onRequestClose={() => updateModalIsOpen(false)}>
            <h3>Comparing</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>{props.currentProductFeatures.name}</th>
                  <th></th>
                  <th>{compareName}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&#10004;</td>
                  <td>
                  {allFeatures.map((feature) => (
                      feature.features.map((feat, i) => (
                        <div key={i} style={{display: 'flex', flexDirection: 'row'}} >
                          <div>{feat.value ? feat.feature : null}</div>
                          <div>{feat.value ? ':' : null}</div>
                          <div>{feat.value ? feat.value : null}</div>
                        </div>
                      ))
                    ))}
                  </td>
                  <td>
                  </td>
                </tr>
              </tbody>
            </table>
            <button style={{textAlign: 'center'}} onClick={() => updateModalIsOpen(false)}>Close</button>
          </Modal>
        </div>
      )
  } else {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
      {props.dataArr.map((item, i) => (
        <div onClick={() => (props.selectProduct(item.id))} id="relatedItemCard" key={i}>
          <img src={getThumbnail(item.id)} />
          <button name={item.name} onClick={modalState}>&#9734;</button>
          <div id="cardCategory">{item.category}</div>
          <div id="cardName">{item.name}</div>
          <div id="cardPrice">{item.sale_price ? item.sale_price : item.default_price}</div>
          <Stars id="cardStars" avgRating={props.avgRating} />
        </div>
      ))}
      </div>
    )
  }
}

export default RelatedItemCard