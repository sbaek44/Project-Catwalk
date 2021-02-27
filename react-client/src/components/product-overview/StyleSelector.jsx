import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';


function StyleSelector(props) {

  const { selectedProduct, selectedStyle, selectStyle, updatePrice, updateSale } = props;

  const [styles, updateStyles] = useState([]);

  const getStyles = (id) => {
    console.log(`getting ${id}`)
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, header)
      .then((res) => {
        // Update options to the whole array
        updateStyles(res.data.results);

        // By default, the style selected will be the first in the list
        let def = res.data.results[0];
        handleSelect(def.style_id, def.original_price, def.sale_price);
      });
  };

  const handleSelect = (styleID, price, sale) => {
    selectStyle(styleID);
    updatePrice(price);
    updateSale(sale);
  }

  useEffect(() => {
    if (selectedProduct !== null) {
      getStyles(selectedProduct.id)
    }
  }, [selectedProduct])

  const makeButtonCSS = (color) => {
    return {
      border: '1px solid black',
      width: 50,
      height: 50,
      margin: 2,
      borderRadius: '50%',
      backgroundColor: color
    }
  }

  return (
    <div>
      {styles.length ?
        <div>
          <div>SELECTED STYLE: {selectedStyle}</div>
          <div className='style-options-container' style={{ display: 'flex', flexDirection: 'row' }}>
            {styles.map((option, index) => {
              return <button key={index}
              className='style-option-button'
              style={makeButtonCSS(option.name)}
              onClick={() => handleSelect(option.style_id, option.original_price, option.sale_price)} />
            })}
          </div>
        </div>
        : null
}
    </div >
  )
}

export default StyleSelector;