import React from 'react';
//import axios
const ProductInformation = (props) => (

  <div>
    {/* Product Information
    Returns all product level information for a specified product id.
    GET /products/:product_id */}
    {console.log('sp', props.selectedProduct) // use .id property of this object to get AlL product information }



    <div>star rating</div>
    <div>category</div>
    <div>title</div>
    <div>price</div>
    {/* <div>free form text field, probably should be a seperate component</div>
    <div>share on social media buttons</div> */}
  </div >
);

export default ProductInformation;