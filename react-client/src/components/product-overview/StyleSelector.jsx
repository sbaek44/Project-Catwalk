/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddToCart from './AddToCart.jsx';

function StyleSelector({
  product,
  selectedStyle,
  selectStyle,
  updatePrice,
  updateSale,
  updatePhotos,
  selectPhoto,
  darkMode,
}) {
  const [styles, updateStyles] = useState([]);

  const handleSelect = (styleID, price, sale, photo, shouldGetPhotos = false) => {
    selectStyle(styleID);
    updatePrice(price);
    updateSale(sale);
    selectPhoto(photo);
    if (shouldGetPhotos) {
      const photos = [];
      if (styles.length) {
        for (const style of styles) {
          if (style.style_id === styleID) {
            for (const each of style.photos) {
              photos.push(each);
            }
          }
        }
      }
      updatePhotos(photos);
    }
  };

  const getStyles = (id) => {
    axios.get(`http://127.0.0.1:3000/api/shared/products/${id}/styles`)
      .then((res) => {
        updateStyles(res.data.results);
        updatePhotos(res.data.results[0].photos);

        // By default, the style selected will be the first in the list
        const def = res.data.results[0];
        handleSelect(def.style_id, def.original_price, def.sale_price, def.photos[0].url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (product.hasOwnProperty('id')) {
      getStyles(product.id);
    }
  }, [product]);

  const styleButtonCSS = (thumbnail) => ({
    borderRadius: '50%',
    backgroundImage: `url(${thumbnail})`,
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  });

  const getNameOfSelectedStyle = (uppercase = null) => {
    for (const option of styles) {
      if (option.style_id === selectedStyle) {
        return uppercase ? option.name.toUpperCase() : option.name;
      }
    }
    return null;
  };

  return (
    <div>
      {styles.length
        ? (
          <div className="style-selector">
            <div className="selected-style-label">
              <span style={{ fontWeight: 'bold' }}>STYLE </span>
              <span>{getNameOfSelectedStyle('uppercase')}</span>
            </div>
            <div className="style-options-container">
              <div className="style-options-grid">
                {styles.map((option, index) => (
                  <div key={index}>
                    <div className={darkMode ? "checkmark-dark" : "checkmark"} id={selectedStyle === option.style_id ? 'checkmark-on' : 'checkmark-off'}>
                      <i className="fa fa-check" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
                    </div>
                    <button
                      type="button"
                      className="style-option-button"
                      style={styleButtonCSS(option.photos[0].thumbnail_url)}
                      onClick={
                        () => {
                          handleSelect(
                            option.style_id,
                            option.original_price,
                            option.sale_price,
                            option.photos[0].url,
                            true,
                          );
                        }
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <AddToCart
              product={product}
              selectedStyle={selectedStyle}
              styleOptions={styles}
              getStyleName={getNameOfSelectedStyle}
              darkMode={darkMode}
            />
          </div>
        )
        : null}
    </div>
  );
}

StyleSelector.propTypes = {
  product: PropTypes.object,
  selectedStyle: PropTypes.number,
  selectStyle: PropTypes.func,
  updatePrice: PropTypes.func,
  updateSale: PropTypes.func,
  updatePhotos: PropTypes.func,
  selectPhoto: PropTypes.func,
};

StyleSelector.defaultProps = {
  product: {},
  selectedStyle: null,
  selectStyle: null,
  updatePrice: null,
  updateSale: null,
  updatePhotos: null,
  selectPhoto: null,
};

export default StyleSelector;
