import React from 'react';
import axios from 'axios';
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
    axios.get(`http://127.0.0.1:3000/api/shared/products/${id}`)
      .then((results) => {
        this.setState({
          selectedProduct: results.data
        })
      })
      .catch(err => (console.log(err)))
  }

  getProducts() {
    let id = 16060;
    axios.get(`http://127.0.0.1:3000/api/shared/products/${id}`)
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
    axios.get(`http://127.0.0.1:3000/api/reviews/meta?product_id=${id}`)
      .then((result) => {
        this.setState({
          metadata: result.data
        }, () => this.findAvgRating());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Overview
          product={this.state.selectedProduct}
          avgRating={this.state.avgRating} />
        {/* <RelatedItemsList
          selectProduct={this.selectProduct}
          avgRating={this.state.avgRating}
          currentProduct={this.state.selectedProduct} />
        <YourOutfitList
          avgRating={this.state.avgRating}
          currentProduct={this.state.selectedProduct} /> */}
        {/* <QA
          currentProduct={this.state.selectedProduct} />  */}
        {/* <Reviews
          avgRating={this.state.avgRating}
          metadata={this.state.metadata}
          getRatings={this.getRatings}
          currentProduct={this.state.selectedProduct.id} /> */}
      </div>
    )
  }
}