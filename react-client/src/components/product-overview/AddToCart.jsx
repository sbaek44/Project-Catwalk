import React, { useState, useEffect } from 'react';

export default function AddToCart(props) {

  const { selectedProduct, selectedStyle, styles } = props;
  const [size, selectSize] = useState('');
  const [qty, selectQty] = useState(1);

  const renderSizeOptions = () => {
    let sizeOptions = [];

    // find selected style id in the styles-options array
    for (let option of styles) {
      if (option.style_id === selectedStyle) {
        // when found, use the size property of the objects in the option's skus array to populate options
        for (let each in option.skus) {
          sizeOptions.push(option.skus[each].size)
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
    // todo: remove 0 and - from the returned options
    // map and return <option> tags that selectQty in state
    return options.map((option, i) => {
      return <option key={i} value={option}>{option}</option>
    })
  }

  const add = () => {
    alert('TODO')
    // Dependent on the current selection in the size and quantity dropdowns, this button will have differing functionality.
    // If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdown, and a message should appear above the dropdown stating “Please select size”.
    // If there is no stock: This button should be hidden
    // If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.
  }


  return (
    <div>
      {styles.length && selectedStyle !== 0 && selectedProduct ?
        <div>
          <select onChange={(e) => selectSize(e.target.value)} value={size}>
            <option>Select Size</option> {/* this becomes inactive and reads OUT OF STOCK if !stock*/}
            {renderSizeOptions()}
          </select>
          <select onChange={(e) => selectQty(e.target.value)} value={qty}>
            <option>-</option>{/*this dropdown should be actually disabled until size is selected*/}
            {renderQtyOptions()}
          </select>
          <button onClick={() => add()}>add to cart</button>
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
// By default, the dropdown should show “Select Size”.
// 1.1.3.2.   Quantity Selector
// The second dropdown will allow the user to select a quantity of the current style and size to add to their cart.
// The options in this dropdown will be a sequence of integers ranging from 1 to the maximum.  The maximum selection will be capped by either the quantity of this style and size in stock, or a hard limit of 15.   For example, if the SKU for the selected product style and size has 4 units left in stock, the dropdown will allow choice of 1, 2, 3 or 4.  However if there are 30 units in stock, the dropdown will only present from 1 to 15.
// If the size has not been selected, then the quantity dropdown will display ‘-’ and the dropdown will be disabled.
// Once a size has been selected, the dropdown should default to 1.
// 1.1.3.3.     Add to cart
// A button labeled “Add to Cart” will appear below the size and quantity dropdowns.  This button will be used to place the style, size and quantity of the product selected into the user’s cart.


