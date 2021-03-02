import React, { useState, useEffect } from 'react';

export default function AddToCart(props) {

  const { selectedProduct, selectedStyle, styles, getStyleName } = props;
  const [size, selectSize] = useState('SELECT SIZE');
  const [qty, selectQty] = useState(1);
  const [outOfStock, warning] = useState(false);
  const [sizeSelectorOpen, toggleSizeSelector] = useState(false);
  const [message, changeMessage] = useState('');

  const renderSizeOptions = () => {
    let sizeOptions = [];

    // find selected style id in the styles-options array
    for (let option of styles) {
      if (option.style_id === selectedStyle) {
        // when found, use the size property of the objects in the option's skus array to populate options
        if (Object.keys(option.skus).length) {
          if (outOfStock === true) {
            warning(false);
            changeMessage('');
          }
          for (let each in option.skus) {
            // only sizes that are currently in stock for the style selected should be listed
            if (option.skus[each].quantity > 0) {
              sizeOptions.push(option.skus[each].size);
            }
          }
        } else {
          if (outOfStock === false) {
            warning(true);
            changeMessage('OUT OF STOCK');
          }
        }
      }
    }


    // map over sizeOptions and return <option> tags that selectSize in state
    return sizeOptions.map((option, i) => {
      return <option key={i} value={option}>{option}</option>
    })
  }

  const renderQtyOptions = () => {

    function getQty() {
      // find selected style id in the styles-options array
      for (let option of styles) {
        if (option.style_id === selectedStyle) {
          for (let each in option.skus) {
            // find currently selected size of the style
            if (option.skus[each].size === size) {
              // use that quantity
              return option.skus[each].quantity;
            }
          }
        }
      }
    }

    let qtyOptions = getQty()

    // hard limit 15
    if (qtyOptions > 15) {
      qtyOptions = 15
    };

    let options = [...Array(qtyOptions).keys()];

    // map and return <option> tags that selectQty in state
    return options.map((option, i) => {
      return <option key={i} value={option + 1}>{option + 1}</option>
    })
  }


  const pleaseSelectSize = () => {
    // todo: should also open the size dropdown automatically
    changeMessage('Please select size.')
  }

  const add = () => {
    // If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.
    if (size === 'SELECT SIZE') {
      pleaseSelectSize();
    } else if (qty > 0) {
      alert(`Added ${qty} ${size} ${selectedProduct.name} in ${getStyleName()} to cart!`)
    }
  }

  const handleSizeSelect = (choice) => {
    selectSize(choice);
    selectQty(1);
    toggleSizeSelector(false);
    changeMessage('');
  }

  return (
    <div className='add-to-cart'>
      {styles.length && selectedStyle !== 0 && selectedProduct ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span className='add-to-cart-message'>{message}</span>
          <div style={{display: 'flex', flexFlow: 'row-nowrap',}}>

            {/* size dropdown should become inactive and read OUT OF STOCK when there's no stock */}
            <div onClick={() => toggleSizeSelector(true)}>
              <select id='size-selector' onChange={(e) => handleSizeSelect(e.target.value)} value={size} disabled={outOfStock} >
                <option value={'SELECT SIZE'}>SELECT SIZE</option>
                {renderSizeOptions()}
              </select>
            </div>

            {/* qty dropdown is disabled until a size is selected*/}
            <select id='qty-selector' onChange={(e) => selectQty(e.target.value)} value={qty} disabled={size === 'SELECT SIZE' ? true : false}>
              {size === 'SELECT SIZE' ? <option>-</option> : renderQtyOptions() }
            </select>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {/* add to cart button is hidden when there's no stock */
            }
            {outOfStock ? null : <button className='add-to-cart-button' onClick={() => add()}><span>ADD TO BAG</span><span>+</span></button>}
            {/* no idea what this button is but its on the mock */}
            <button className='favorite-button'>☆</button>
          </div>
        </div>
        : null}
    </div>
  )
}


// Add to Cart
// Below the style selector, two dropdowns should allow the user to select the size and quantity of the item to add to their cart.   The options available within these dropdowns will vary based on the selected product style9.
// 1.1.3.1.   Size Selector
// The first dropdown will list all of the available sizes for the currently selected style.
// Only sizes that are currently in stock for the style selected should be listed.  Sizes not available should not appear within the list.  If there is no remaining stock for the current style, the dropdown should become inactive and read “OUT OF STOCK”.
// When collapsed, the dropdown should show the currently selected size.
// By default, the dropdown should show “SELECT SIZE”.
// 1.1.3.2.   Quantity Selector
// The second dropdown will allow the user to select a quantity of the current style and size to add to their cart.
// The options in this dropdown will be a sequence of integers ranging from 1 to the maximum.  The maximum selection will be capped by either the quantity of this style and size in stock, or a hard limit of 15.   For example, if the SKU for the selected product style and size has 4 units left in stock, the dropdown will allow choice of 1, 2, 3 or 4.  However if there are 30 units in stock, the dropdown will only present from 1 to 15.
// If the size has not been selected, then the quantity dropdown will display ‘-’ and the dropdown will be disabled.
// Once a size has been selected, the dropdown should default to 1.
// 1.1.3.3.     Add to cart
// A button labeled “Add to Cart” will appear below the size and quantity dropdowns.  This button will be used to place the style, size and quantity of the product selected into the user’s cart.


