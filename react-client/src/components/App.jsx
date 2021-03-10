import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './product-overview/Overview.jsx';
import RelatedItemsList from './related items/RelatedItemsList.jsx';
import YourOutfitList from './related items/YourOutfitList.jsx';
import Reviews from './Reviews/Reviews.jsx';
import QA from './Questions-Answers/QA.jsx';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Grid, Typography, Button, Paper } from '@material-ui/core';

function App() {
  const [selectedProduct, updateSelectedProduct] = useState([]);
  const [metadata, updateMetadata] = useState('');
  const [avgRatings, updateAvgRatings] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (metadata.ratings) {
      findAvgRating()
    }
  }, [metadata])

  const findAvgRating = () => {
    const ratingsData = metadata.ratings
    if (Object.keys(ratingsData).length === 0) {
      return '';
    }
    let totalScore = 0;
    let amountOfRatings = 0;
    for (let key in ratingsData) {
      let value = Number(ratingsData[key])
      let actualValue = key * value;
      totalScore += actualValue;
      amountOfRatings += value;
    };

    let averageScore = totalScore / amountOfRatings;
    let rounded = Math.round(averageScore * 4) / 4;
    updateAvgRatings(rounded)
  }

  const selectProduct = (id) => {
    axios.get(`http://127.0.0.1:3000/api/shared/products/${id}`)
      .then((results) => {
        updateSelectedProduct(results.data)
      })
      .catch(err => (console.log(err)))
  }

  const getProducts = () => {
    let id = 16060;
    axios.get(`http://127.0.0.1:3000/api/shared/products/${id}`)
      .then((data) => {
        updateSelectedProduct(data.data)
      })
      .then(() => (getRatings()))
      .catch((err) => {
        console.log(err);
      });
  }

  const getRatings = () => {
    let id = selectedProduct.id;
    axios.get(`http://127.0.0.1:3000/api/reviews/meta?product_id=${id}`)
      .then((result) => {
        updateMetadata(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Paper>
      <div>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
        {/* <Overview
          product={selectedProduct}
          avgRating={avgRatings} />
        <RelatedItemsList
          selectProduct={selectProduct}
          avgRating={avgRatings}
          currentProduct={selectedProduct} />
        <YourOutfitList
          avgRating={avgRatings}
          currentProduct={selectedProduct} /> */}
        <QA
          currentProduct={selectedProduct} />
        {/* <Reviews
          avgRating={avgRatings}
          metadata={metadata}
          getRatings={getRatings}
          currentProduct={selectedProduct.id} /> */}
      </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App