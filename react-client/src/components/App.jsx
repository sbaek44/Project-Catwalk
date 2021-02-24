import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js'

let App = () => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrlax42/', {
    headers: {
      'Authorization': `Basic ${API_KEY}`
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