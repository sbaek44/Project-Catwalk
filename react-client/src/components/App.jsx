import React from 'react';
import axios from 'axios';
import header from '../../../config.js'
import Overview from './product-overview/Overview.jsx'
import RelatedItemsList from './related items/RelatedItemsList.jsx';
import Reviews from './Reviews/Reviews.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allProducts: [],
      selectedItemIndex: 0
    }
    this.getProducts = this.getProducts.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  selectProduct(index) {
    this.setState({
      selectedItemIndex: index
    })
  }

  getProducts() {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?count=10&page=5', header)
      .then((data) => {
        this.setState({
          allProducts: data.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <Overview products={this.state.allProducts} selectedItemIndex={this.state.selectedItemIndex} />
        <RelatedItemsList currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''} />
        <Reviews currentProduct={this.state.allProducts[this.state.selectedItemIndex] || ''} />
      </div>
    )
  }
}