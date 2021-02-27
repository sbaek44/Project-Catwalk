import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import Questions from './Questions.jsx';
import Answers from './Answers.jsx';

const QA= (props) => {






  return (
    <div>
      <Questions currentProduct = {props.currentProduct}/>
    </div>
  )
}

export default QA;