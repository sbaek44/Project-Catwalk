import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js'

let App = () => {
  console.log(API_KEY)
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products', {
    headers: {
      'authorization': API_KEY
    }
  }).then((data) => {
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