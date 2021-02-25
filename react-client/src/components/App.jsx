import React from 'react';
import axios from 'axios';
import header from '../../../config.js'

let App = () => {
  console.log(header)
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products', header)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
  return (
    <div>React</div>
  )
}

export default App;