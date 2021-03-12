/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function TestAddToCart({
  product,
  selectedStyle,
  styleOptions,
}) {
  const [size, selectSize] = useState('');
  const [sizeOptions, setSizeOptions] = useState(['S', 'M', 'L']);
  const [qty, selectQty] = useState(1);
  const [qtyOptions, setQtyOptions] = useState([1, 2, 3]);
  const [sizeMenuOpen, toggleSizeMenu] = useState(false);
  const [qtyMenuOpen, toggleQtyMenu] = useState(false);
  const [outOfStock, warning] = useState(false);
  const [message, changeMessage] = useState('');

  const handleSizeSelect = (sizeOption) => {
    selectSize(sizeOption.value);
    toggleSizeMenu(false);
    changeMessage('');
  };

  const handleQtySelect = (qtyOption) => {
    selectQty(qtyOption.value);
    toggleQtyMenu(false);
  };

  useEffect(() => {
    selectQty(1);
  }, [size]);

  useEffect(() => {
    toggleSizeMenu(false);
    selectSize('');
    toggleQtyMenu(false);
  }, [product, selectedStyle]);

  const closeMenus = () => {
    if (sizeMenuOpen) {
      toggleSizeMenu(false);
    }
    if (qtyMenuOpen) {
      toggleQtyMenu(false);
    }
  };

  return (
    <div>
      <span>{message}</span>
      <form data-testid="size-dropdown">
        <Select
          role="size-select"
          id="size"
          className="dropdown"
          widgetname="overview"
          onFocus={() => toggleSizeMenu(true)}
          blurInputOnSelect
          onChange={handleSizeSelect}
          value={[{ value: size !== '' ? size : outOfStock ? 'OUT OF STOCK' : 'SELECT SIZE', label: size !== '' ? size : outOfStock ? 'OUT OF STOCK' : 'SELECT SIZE' }]}
          isDisabled={outOfStock}
          options={sizeOptions}
          menuIsOpen={sizeMenuOpen}
          isSearchable={false}
        />
      </form>
      <form data-testid="qty-dropdown">
        <Select
          id="qty"
          className="dropdown"
          widgetname="overview"
          onFocus={() => toggleQtyMenu(true)}
          blurInputOnSelect
          onChange={handleQtySelect}
          value={[{ value: size !== '' ? qty : '-', label: size !== '' ? qty : '-' }]}
          isDisabled={size === '' ? true : false}
          options={qtyOptions}
        />
      </form>
    </div >

  )
}

  export default TestAddToCart;
