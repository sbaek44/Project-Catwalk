import React from 'react';
import axios from 'axios';
import header from '../../../config.js'
import Overview from './product-overview/Overview.jsx'
import RelatedItemsList from './related items/RelatedItemsList.jsx';
import YourOutfitList from './related items/YourOutfitList.jsx'
import Reviews from './Reviews/Reviews.jsx';
import QA from './Questions-Answers/QA.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: [],
      metadata: '',
      avgRating: 0
    }
    this.getProducts = this.getProducts.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.findAvgRating = this.findAvgRating.bind(this);
    this.getRatings = this.getRatings.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  findAvgRating() {
    const ratingsData = this.state.metadata.ratings
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
    this.setState({
      avgRating: rounded
  })
}

  selectProduct(id) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, header)
    .then((results) => {
      this.setState({
        selectedProduct: results.data
      })
    })
    .catch(err => (console.log(err)))
  }

  randomNumber(max) {
    return (Math.floor(Math.random() * max)) + 1 // errors if we try to load page 0
  }

  getProducts() {
    let id = 16060;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, header)
      .then((data) => {
        this.setState({
          selectedProduct: data.data
        }, () => this.getRatings())
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRatings() {
    let id = this.state.selectedProduct.id;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${id}`, header)
      .then((result) => {
        this.setState({
          metadata: result.data
        }, () => this.findAvgRating());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findAvgRating() {
    const ratingsData = this.state.metadata.ratings;
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
    this.setState({
      avgRating: rounded,
  });
}

  randomNumber(max) {
    return (Math.floor(Math.random() * max)) + 1 // errors if we try to load page 0
  }

  render() {
    return (
      <div>
        {/* <Overview
          product={this.state.selectedProduct}
          avgRating={this.state.avgRating} /> */}
        <RelatedItemsList
          selectProduct={this.selectProduct}
          avgRating={this.state.avgRating}
          currentProduct={this.state.selectedProduct} />
        <YourOutfitList
          avgRating={this.state.avgRating}
          currentProduct={this.state.selectedProduct} />
        {/* <QA
          currentProduct={this.state.selectedProduct}/>
        <Reviews
          avgRating={this.state.avgRating}
          metadata={this.state.metadata}
          currentProduct={this.state.selectedProduct[0]} /> */}
      </div>
    )
  }
}