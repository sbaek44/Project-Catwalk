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
      allProducts: [],
      selectedItemIndex: 0,
      ratings: '',
      avgRating: 0
    }
    this.getProducts = this.getProducts.bind(this);
    // this.selectProduct = this.selectProduct.bind(this);
    this.findAvgRating = this.findAvgRating.bind(this);
    this.getRatings = this.getRatings.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  findAvgRating() {

    const ratingsData = this.state.ratings
    if (Object.keys(ratingsData).length === 0) {
      console.log(this.state.avgRating)
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


  // selectProduct(index) {
  //   this.setState({
  //     selectedItemIndex: index
  //   })
  // }

  randomNumber(max) {
    return (Math.floor(Math.random() * max)) + 1 // errors if we try to load page 0
  }

  getProducts() {
    let page = this.randomNumber(50);
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?count=10&page=${page}`, header)
      .then((data) => {
        this.setState({
          allProducts: data.data
        }, () => this.getRatings())
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getRatings() {
    let id = this.state.allProducts[this.state.selectedItemIndex].id;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${id}`, header)
      .then((result) => {
        this.setState({
          ratings: result.data.ratings
        }, () => this.findAvgRating());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Overview products={this.state.allProducts} selectedItemIndex={this.state.selectedItemIndex} avgRating={this.state.avgRating} />
        <RelatedItemsList currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''} />

        <YourOutfitList currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''} />

        <QA currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''}/>
        <Reviews currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''} />
      </div>
    )
  }
}