import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import AddToCart from './AddToCart.jsx';

function StyleSelector({ product, selectedStyle, selectStyle, updatePrice, updateSale, updatePhotos, selectPhoto }) {

  const [styles, updateStyles] = useState([]);

  const getStyles = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, header)
      .then((res) => {
        updateStyles(res.data.results);
        updatePhotos(res.data.results[0].photos);

        // By default, the style selected will be the first in the list
        let def = res.data.results[0];
        handleSelect(def.style_id, def.original_price, def.sale_price, def.photos[0].url);
      })
      .catch((err) => {
        console.error(err)
      })
  };

  const handleSelect = (styleID, price, sale, photo, shouldGetPhotos = false) => {
    selectStyle(styleID);
    updatePrice(price);
    updateSale(sale);
    selectPhoto(photo);
    if (shouldGetPhotos) {
      let photos = [];
      if (styles.length) {
        for (let style of styles) {
          if (style.style_id === styleID) {
            for (let photo of style.photos) {
              photos.push(photo)
            }
          }
        }
      }
      updatePhotos(photos);
    }

  }

  useEffect(() => {
    if (product.hasOwnProperty('id')) {
      getStyles(product.id)
    }
  }, [product])

  const styleButtonCSS = (thumbnail) => {
    return {
      borderRadius: '50%',
      backgroundImage: `url(${thumbnail})`,
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat'
    }
  }


  const getNameOfSelectedStyle = (uppercase = null) => {
    for (let option of styles) {
      if (option.style_id === selectedStyle) {
        return uppercase ? option.name.toUpperCase() : option.name
      }
    }
  }

  return (
    <div>
      {styles.length ?
        <div className='style-selector'>
          <div className='selected-style-label'>
            <span style={{ fontWeight: 'bold', marginRight: 5 }}>STYLE </span>
            <span style={{ color: 'rgb(160,160,160)' }}>{getNameOfSelectedStyle('uppercase')}</span>
          </div>

          <div className='style-options-container'>
            <div className='style-options-grid'>
              {styles.map((option, index) => {
                return <div key={index}>
                  <div className='checkmark' id={selectedStyle === option.style_id ? 'on' : 'off'}>✔</div>
                  <button key={index}
                    className='style-option-button'
                    style={styleButtonCSS(option.photos[0].thumbnail_url)}
                    onClick={() => handleSelect(option.style_id, option.original_price, option.sale_price, option.photos[0].url, true)}>
                  </button>
                </div>
              })}
            </div>

          </div>
          <AddToCart product={product} selectedStyle={selectedStyle} styles={styles} getStyleName={getNameOfSelectedStyle} />
        </div>
        : null
      }
    </div >
  )
}

export default StyleSelector;